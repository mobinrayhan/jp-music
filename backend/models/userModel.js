const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

exports.getUserById = async (id) => {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');
  return collection.findOne({ _id: new ObjectId(id) });
};

exports.getDownloadsById = async (userId) => {
  const db = await connectToDatabase();
  const userColl = await db.collection('users');

  // USING AI FOR BETTER RESULT
  return userColl
    .aggregate([
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        // Unwind the downloads array so each element becomes a separate document
        $unwind: '$downloads',
      },
      {
        // Perform a $lookup to join with the audios collection
        $lookup: {
          from: 'audios', // Name of the audios collection
          localField: 'downloads.audioId', // Field in user collection to match
          foreignField: '_id', // Field in audios collection to match
          as: 'audio', // Name of the new field where the joined audio data will be stored
        },
      },
      {
        // Unwind the audio array to flatten the joined audio data
        $unwind: '$audio',
      },
      {
        // Merge the downloads data into the corresponding audio document as downloadInfo
        $addFields: {
          'audio.downloadInfo': '$downloads', // Insert the download object into the audio document as downloadInfo
        },
      },
      {
        // Project to output the audio object directly with downloadInfo
        $project: {
          _id: 0, // Omit user _id
          audio: 1, // Keep the audio document with downloadInfo
        },
      },
      {
        // Replace root to output plain object without the 'audio' key
        $replaceRoot: { newRoot: '$audio' },
      },
      {
        // Sort the result by downloadInfo.date in descending order
        $sort: { 'downloadInfo.date': -1 },
      },
    ])
    .toArray();
};
