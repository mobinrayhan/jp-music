const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

exports.getUserById = async (id) => {
  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return collection.findOne({ _id: new ObjectId(id) });
};

exports.getDownloadsById = async ({ userId, querySearch = '', maxAudios }) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');

  // USING AI FOR BETTER RESULT
  return userColl
    .aggregate([
      {
        $match: { _id: new ObjectId(userId) }, // Match the user by ID
      },
      {
        $unwind: '$downloads', // Unwind downloads array
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'downloads.audioId',
          foreignField: '_id',
          as: 'audio',
        },
      },
      {
        $unwind: '$audio', // Unwind joined audio data
      },
      {
        // Add the search query here
        $match: {
          $or: [
            { 'audio.name': { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with
            { 'audio.name': { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with
            { 'audio.name': { $regex: `${querySearch}`, $options: 'i' } }, // Includes
            { 'audio.keywords': { $regex: `${querySearch}`, $options: 'i' } }, // Search in keywords array
          ],
        },
      },
      {
        $addFields: {
          'audio.downloadInfo': '$downloads',
        },
      },
      {
        $replaceRoot: { newRoot: '$audio' }, // Replace root with audio document
      },
      {
        $sort: { 'downloadInfo.date': -1 }, // Sort by downloadInfo.date
      },
      {
        $facet: {
          totalCount: [{ $count: 'total' }], // Calculate total audios count
          limitedAudios: [{ $limit: maxAudios }], // Limit the number of audios returned
        },
      },
      {
        $project: {
          totalAudios: { $arrayElemAt: ['$totalCount.total', 0] }, // Extract total audios count
          audios: '$limitedAudios', // Return the limited audios
        },
      },
    ])
    .next(); // Return as an object
};

exports.postToggleFavourites = async ({ userId, audioId }) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');

  const result = await userColl.updateOne(
    { _id: new ObjectId(userId), 'favorites.id': new ObjectId(audioId) },
    {
      $pull: { favorites: { id: new ObjectId(audioId) } },
    }
  );
  if (result.modifiedCount > 0) {
    return { message: 'Unliked Successfully!' };
  } else {
    const pushResult = await userColl.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { favorites: { id: new ObjectId(audioId), date: new Date() } },
      }
    );
    if (pushResult.modifiedCount > 0) {
      return { message: 'Added Favorite Successfully!' };
    } else {
      return { success: false, message: 'Failed to add to favorites' };
    }
  }
};

exports.getFavorites = async ({ userId, querySearch = '', maxAudios }) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');
  const audioColl = await db.collection('audios');

  const user = await userColl.findOne({ _id: new ObjectId(userId) });
  const favoriteIds = user.favorites.map((fav) => fav.id);

  return await audioColl
    .aggregate([
      {
        $match: {
          _id: { $in: favoriteIds }, // Match audio documents by favorite IDs
        },
      },
      {
        // Global search for audio name and keywords
        $match: {
          $or: [
            { name: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with search term
            { name: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with search term
            { name: { $regex: querySearch, $options: 'i' } }, // Includes search term
            { keywords: { $regex: querySearch, $options: 'i' } }, // Search in keywords array
          ],
        },
      },
      {
        $sort: { date: -1 }, // Sort by date, most recent first
      },
      {
        $limit: maxAudios, // Limit the results to the maxAudios
      },
    ])
    .toArray();
};

exports.getFavoriteIds = async (userId) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');
  return await userColl.findOne(
    { _id: new ObjectId(userId) },
    { projection: { favorites: 1 } }
  );
};

exports.getPlaylistBySlug = async (slug) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');
  return await userColl.findOne({ 'playlists.slug': slug });
};

exports.createPlaylist = async ({ playlistName, slug, userId }) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');

  return userColl.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        playlists: {
          name: playlistName,
          slug,
          updatedAt: new Date(),
          audioIds: [],
        },
      },
    }
  );
};

exports.getPlaylists = async (userId) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');

  const playlists = await userColl
    .find(
      { _id: new ObjectId(userId) },
      { projection: { playlists: 1, _id: 0 } }
    )
    .next();

  return playlists;
};
