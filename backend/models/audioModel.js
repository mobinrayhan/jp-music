const { dirname, join } = require('path');
const fs = require('fs');
const { connectToDatabase } = require('./db');

exports.getAllAudios = async function () {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');
  return await collection.find({}).toArray();
};

exports.getAudioByCategoryName = async function (catName) {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');
  return await collection.find({ category: catName }).toArray();
};

exports.getAudioBySearch = async function (search, category) {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');

  console.log(search, category);

  // const result = await collection
  //   .aggregate([
  //     {
  //       $match: {
  //         $text: { $search: search }, // Step 3: Full-text search using queryText
  //       },
  //     },
  //     {
  //       $addFields: {
  //         score: { $meta: 'textScore' }, // Add search relevance score to each document
  //       },
  //     },
  //     {
  //       $sort: { score: { $meta: 'textScore' } }, // Sort by text search score (relevance)
  //     },
  //     {
  //       $match: {
  //         ...(category !== 'all' ? { category: category } : {}), // Conditionally match category unless it's "all"
  //       },
  //     },
  //     {
  //       $sort: { createdAt: -1 }, // Step 2: Sort by date in descending order
  //     },
  //   ])
  //   .toArray();
  //
  // return result;

  return await collection
    .aggregate([
      {
        // Step 1: Match category if not "all"
        $match: {
          ...(category !== 'all' ? { category: category } : {}),
          // Step 2: Using $or for a rich search on the title
          $or: [
            { name: { $regex: `^${search}`, $options: 'i' } }, // Starts with
            { name: { $regex: `${search}$`, $options: 'i' } }, // Ends with
            { name: { $regex: `${search}`, $options: 'i' } }, // Includes
          ],
        },
      },
      {
        // Step 3: Sort by date in descending order
        $sort: { createdAt: -1 },
      },
    ])
    .toArray();
};
