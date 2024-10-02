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
