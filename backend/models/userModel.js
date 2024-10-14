const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

exports.getUserById = async (id) => {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');
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
