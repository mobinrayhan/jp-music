const { dirname, join } = require('path');
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

exports.geAudioInfoById = async function (audioId) {
  const db = await connectToDatabase();
  const audioColl = await db.collection('audios');
  return audioColl.findOne({ _id: new ObjectId(audioId) });
};

exports.categoryAudiosWithSearch = async function ({
  querySearch,
  category,
  maxAudio,
}) {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');

  // USING CHATGPT FOR BEST POSSIBLE QUERY
  const result = await collection
    .aggregate([
      {
        $match: {
          ...(category !== 'all' ? { category: category } : {}),
          $or: [
            { name: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with
            { name: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with
            { name: { $regex: `${querySearch}`, $options: 'i' } }, // Includes

            { keywords: { $regex: `${querySearch}`, $options: 'i' } }, // Search in keywords array
          ],
        },
      },
      {
        $facet: {
          totalCount: [{ $count: 'total' }], // Count the total audios
          audios: [
            { $sort: { downloadCount: -1 } }, // Sort the results
            { $limit: maxAudio }, // Limit the number of audios
          ],
        },
      },
    ])
    .toArray();

  const totalAudios =
    result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
  const audios = result[0].audios;

  return {
    totalAudios,
    audios,
  };
};

exports.newestAudiosWithSearch = async function ({ querySearch, maxAudio }) {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');

  const result = await collection
    .aggregate([
      {
        $match: {
          // Check if querySearch exists and is not an empty string
          ...(querySearch !== 'undefined' && querySearch.trim()
            ? {
                $or: [
                  { name: { $regex: `^${querySearch}`, $options: 'i' } }, // Starts with
                  { name: { $regex: `${querySearch}$`, $options: 'i' } }, // Ends with
                  { name: { $regex: `${querySearch}`, $options: 'i' } }, // Includes
                  { keywords: { $regex: `${querySearch}`, $options: 'i' } }, // Search in keywords array
                ],
              }
            : {}), // Match all documents if querySearch is not provided or is empty
        },
      },
      {
        $facet: {
          totalCount: [{ $count: 'total' }], // Count the total audios
          audios: [
            { $sort: { createdAt: -1 } }, // Sort the results
            { $limit: maxAudio }, // Limit the number of audios
          ],
        },
      },
    ])
    .toArray();

  // Return the result
  const totalAudios =
    result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
  const audios = result[0].audios;

  return {
    totalAudios,
    audios,
  };
};

exports.postDownloadAudio = async function (audioId, userId) {
  const db = await connectToDatabase();
  const audioColl = await db.collection('audios');
  const userColl = await db.collection('users');

  await userColl.updateOne(
    {
      _id: new ObjectId(userId),
      'downloads.audioId': new ObjectId(audioId), // Check if the audioId exists
    },
    {
      $set: {
        'downloads.$.date': new Date(), // Update the date if audioId exists
      },
      $inc: {
        'downloads.$.count': 1, // Increment the count if audioId exists
      },
    },
    {
      upsert: false, // Ensure this doesn't create a new document
    }
  );
  await userColl.updateOne(
    {
      _id: new ObjectId(userId),
      'downloads.audioId': { $ne: new ObjectId(audioId) }, // Only push if audioId doesn't exist
    },
    {
      $push: {
        downloads: {
          audioId: new ObjectId(audioId),
          date: new Date(),
          count: 1,
        },
      },
    }
  );

  await audioColl.updateOne(
    { _id: new ObjectId(audioId) },
    { $inc: { downloadCount: 1 } }
  );

  return audioColl.findOne({ _id: new ObjectId(audioId) });
};

exports.postUploadAudios = async function (audiosArr) {
  const db = await connectToDatabase();
  const audioColl = await db.collection('audios');
  return audioColl.insertMany(audiosArr);
};

exports.postUpdateAudio = async (id, audioInfo) => {
  const db = await connectToDatabase();
  const audioColl = await db.collection('audios');
  return audioColl.updateOne({ _id: new ObjectId(id) }, { $set: audioInfo });
};
