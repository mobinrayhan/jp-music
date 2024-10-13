const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

exports.getUserById = async (id) => {
  const db = await connectToDatabase();
  const collection = await db.collection('audios');
  return collection.findOne({ _id: new ObjectId(id) });
};
