const { MongoClient } = require('mongodb');

const dbName = 'soundei';
const uri =
  process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.MONGODB_PROD_USERNAME}:${process.env.MONGODB_PROD_PASSWORD}@127.0.0.1:27017/soundei?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2`
    : `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/soundei?authSource=admin`; // Add authSource=admin if needed

// mongodb://soundei:J2yP8N7mShamkKAt@127.0.0.1:27017/soundei?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2

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
