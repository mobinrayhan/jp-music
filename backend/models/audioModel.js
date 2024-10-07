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

  return await collection
    .aggregate([
      {
        $match: {
          ...(category !== 'all' ? { category: category } : {}),
          $or: [
            { name: { $regex: `^${search}`, $options: 'i' } }, // Starts with
            { name: { $regex: `${search}$`, $options: 'i' } }, // Ends with
            { name: { $regex: `${search}`, $options: 'i' } }, // Includes
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])
    .toArray();
};
