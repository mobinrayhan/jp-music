const { connectToDatabase } = require('./db');

exports.getAllCategories = async function () {
  const db = await connectToDatabase();
  const collection = await db.collection('audioCategory');
  return await collection.find({}).toArray();
};
