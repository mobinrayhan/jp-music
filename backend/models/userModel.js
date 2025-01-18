const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');
const getMongoQueryFromInput = require('../helpers/getMongoQueryFromInput');

exports.getAllUsers = async ({ limit, skip, querySearch }) => {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const pipeline = [
    // Step 1: Match based on querySearch if it's not empty
    ...(querySearch
      ? [
          {
            $match: {
              $or: [
                { username: { $regex: querySearch, $options: 'i' } }, // Includes in name
                { email: { $regex: querySearch, $options: 'i' } }, // Includes in email
                { username: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with name
                { email: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with email
                { username: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with name
                { email: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with email
              ],
            },
          },
        ]
      : []),
    // Step 2: Facet for paginated data and total count
    { $sort: { createdAt: -1 } }, // Sort by newest users,
    {
      $facet: {
        users: [
          // Sort by createdAt descending
          { $sort: { createdAt: -1 } },
          // Skip and Limit for Pagination
          { $skip: skip },
          { $limit: limit },
          // Project selected fields
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
              role: 1,
              isActive: 1,
              createdAt: 1,
              lastLogin: 1,
            },
          },
        ],
        totalCount: [
          { $count: 'count' }, // Total count of users
        ],
      },
    },
    // Step 3: Flatten the totalCount array to return a single number
    {
      $addFields: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
      },
    },
  ];

  // Run the aggregation
  const result = await collection.aggregate(pipeline).toArray();

  // Extract users and totalCount from the result
  const { users, totalCount } = result[0] || { users: [], totalCount: 0 };

  return { users, totalCount };
};

exports.getAllDisabledUsers = async ({ limit, skip, querySearch }) => {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const pipeline = [
    { $match: { isActive: false } },
    ...(querySearch
      ? [
          {
            $match: {
              $or: [
                { username: { $regex: querySearch, $options: 'i' } }, // Includes in name
                { email: { $regex: querySearch, $options: 'i' } }, // Includes in email
                { username: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with name
                { email: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with email
                { username: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with name
                { email: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with email
              ],
            },
          },
        ]
      : []),
    { $sort: { createdAt: -1 } }, // Sort by newest users
    {
      $facet: {
        users: [
          // Sort by createdAt descending
          { $sort: { createdAt: -1 } },
          // Skip and Limit for Pagination
          { $skip: skip },
          { $limit: limit },
          // Project selected fields
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
              role: 1,
              isActive: 1,
              createdAt: 1,
              lastLogin: 1,
            },
          },
        ],
        totalCount: [
          { $count: 'count' }, // Total count of users
        ],
      },
    },
    // Step 3: Flatten the totalCount array to return a single number
    {
      $addFields: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
      },
    },
  ];

  // Run the aggregation
  const result = await collection.aggregate(pipeline).toArray();

  // Extract users and totalCount from the result
  const { users: disabledUsers, totalCount } = result[0] || {
    disabledUsers: [],
    totalCount: 0,
  };

  return { disabledUsers, totalCount };
};

exports.getUser = async (input, projection) => {
  if (!input) {
    throw new Error('Input is required to check user status');
  }
  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return collection.findOne(query, { projection });
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

exports.getPlaylistBySlug = async ({ slug, userId, querySearch, maxAudio }) => {
  const db = await connectToDatabase();
  const userColl = db.collection('users');

  const result = await userColl
    .aggregate([
      {
        // First, match the user by userId
        $match: { _id: new ObjectId(userId) },
      },
      {
        // Filter to get the playlist by slug
        $project: {
          playlist: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$playlists',
                  as: 'playlist',
                  cond: { $eq: ['$$playlist.slug', slug] },
                },
              },
              0,
            ],
          },
          _id: 0,
        },
      },

      {
        // Exclude audioIds from the playlist
        $project: {
          'playlist.audioIds': 0,
        },
      },
    ])
    .toArray();

  return result.length && result[0].playlist ? result[0].playlist : null;
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

exports.getPlaylists = async ({ userId, querySearch, maxPlaylist }) => {
  const db = await connectToDatabase();
  const userColl = db.collection('users');

  const pipeline = [
    {
      $match: { _id: new ObjectId(userId) },
    },
    {
      $unwind: '$playlists',
    },
    // Optional search filter based on `querySearch`
    ...(querySearch
      ? [
          {
            $match: {
              $or: [
                {
                  'playlists.name': {
                    $regex: `^${querySearch}`,
                    $options: 'i',
                  },
                },
                {
                  'playlists.name': {
                    $regex: `${querySearch}$`,
                    $options: 'i',
                  },
                },
                {
                  'playlists.name': {
                    $regex: `${querySearch}`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
        ]
      : []),
    {
      $sort: { 'playlists.updatedAt': -1 },
    },
    {
      $group: {
        _id: null,
        playlists: { $push: '$playlists' },
        totalPlaylists: { $sum: 1 },
      },
    },
    {
      $project: {
        playlists: { $slice: ['$playlists', maxPlaylist] },
        totalPlaylists: 1,
      },
    },
  ];

  const result = await userColl.aggregate(pipeline).next();
  return result || { playlists: [], totalPlaylists: 0 };
};

exports.postAddAudioToPlaylist = async ({ userId, audioId, slug }) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');
  // Step 1: Try updating the `createdAt` field if the audioId already exists in the specified playlist
  let result = await userColl.updateOne(
    {
      _id: new ObjectId(userId),
      'playlists.slug': slug,
      'playlists.audioIds.audioId': new ObjectId(audioId), // Check if audioId exists in the specified playlist
    },
    {
      $set: {
        'playlists.$[playlist].audioIds.$[audio].createdAt': new Date(),
      },
    },
    {
      arrayFilters: [
        { 'playlist.slug': slug },
        { 'audio.audioId': new ObjectId(audioId) },
      ],
    }
  );

  // Step 2: If no modification was made, it means the audioId doesn't exist in the playlist, so push it
  if (result.modifiedCount === 0) {
    result = await userColl.updateOne(
      {
        _id: new ObjectId(userId),
        'playlists.slug': slug,
      },
      {
        $push: {
          'playlists.$.audioIds': {
            audioId: new ObjectId(audioId),
            createdAt: new Date(),
          },
        },
      }
    );
  }

  return result.modifiedCount > 0;
};

exports.getAudiosFromPlaylist = async ({
  userId,
  playlistSlug,
  querySearch,
  maxAudios,
}) => {
  const db = await connectToDatabase();
  const userColl = db.collection('users');
  const audioColl = db.collection('audios');

  // Step 1: Find the user and get their playlists
  const user = await userColl.findOne(
    { _id: new ObjectId(userId) },
    { projection: { playlists: 1 } }
  );

  if (!user) {
    return { audios: [], totalAudios: 0 };
  }

  // Step 2: Find the specific playlist by slug
  const playlist = user.playlists.find((pl) => pl.slug === playlistSlug);
  if (!playlist) {
    return { audios: [], totalAudios: 0 };
  }

  // Step 3: Extract and sort `audioIds` by `createdAt` in descending order
  const sortedAudioIds = playlist.audioIds
    .sort((a, b) => b.createdAt - a.createdAt) // Sort descending by `createdAt`
    .map((item) => item.audioId);

  // Step 4: Limit sorted `audioIds` based on `maxAudio`
  const limitedAudioIds = sortedAudioIds.slice(0, maxAudios);

  // Step 5: Define search conditions if `querySearch` is provided
  const searchConditions = querySearch
    ? {
        $or: [
          { name: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with
          { name: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with
          { name: { $regex: `${querySearch}`, $options: 'i' } }, // Includes
          { keywords: { $regex: `${querySearch}`, $options: 'i' } }, // Search in keywords
        ],
      }
    : {};

  // Step 6: Count total matching audios
  const totalAudios = await audioColl.countDocuments({
    _id: { $in: sortedAudioIds },
    ...searchConditions,
  });

  // Step 7: Fetch audios with the limited IDs and search conditions
  const audiosList = await audioColl
    .find({
      _id: { $in: limitedAudioIds },
      ...searchConditions,
    })
    .toArray();

  // Step 8: Order fetched audios based on `limitedAudioIds` order
  const orderedAudios = limitedAudioIds
    .map((id) => audiosList.find((audio) => audio._id.equals(id)))
    .filter((audio) => audio); // Filter out any unmatched audios

  return { audios: orderedAudios, totalAudios };
};

exports.checkUserExists = async (input) => {
  if (!input) {
    throw new Error('Input is required to check user existence');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');

  const count = await userColl.countDocuments(query, { limit: 1 });
  return count > 0;
};

exports.getActiveStatus = async (input) => {
  if (!input) {
    throw new Error('Input is required to check user status');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');

  return await userColl.findOne(query, {
    projection: { isActive: 1, _id: 0 },
  });
};

exports.getUserRole = async (input) => {
  if (!input) {
    throw new Error('Input is required to check user role');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');

  return await userColl.findOne(query, {
    projection: { role: 1, _id: 0 },
  });
};

exports.toggleActiveStatus = async (input) => {
  if (!input) {
    throw new Error('Input is required to check user role');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');
  const existedUser = await userColl.findOne(query);

  return await userColl.updateOne(query, {
    $set: { isActive: !existedUser.isActive },
  });
};

exports.updateUser = async ({ input, updatedUser }) => {
  if (!input) {
    throw new Error('Input is required to check user role');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');

  return userColl.updateOne(query, { $set: updatedUser });
};

exports.getAccountInfo = async (input) => {
  if (!input) {
    throw new Error('Input is required to check user role');
  }

  const query = getMongoQueryFromInput(input);

  const db = await connectToDatabase();
  const userColl = db.collection('users');
  return await userColl
    .aggregate([
      {
        $match: query, // Find the specific user based on the query
      },
      {
        $project: {
          username: 1,
          email: 1,
          totalDownloads: { $size: '$downloads' },
          totalPlaylists: { $size: '$playlists' },
          totalFavorites: { $size: '$favorites' },
        },
      },
    ])
    .next();
};
