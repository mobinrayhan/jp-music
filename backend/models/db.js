const { MongoClient } = require('mongodb');

const dbName = 'soundei';
const uri = `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/soundei?authSource=soundei`; // Add authSource=admin if needed

let client;
let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(uri);

    await client.connect();

    console.log('Connected to MongoDB');

    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
module.exports = { connectToDatabase };
