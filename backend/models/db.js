const { MongoClient } = require('mongodb');

const dbName = 'soundei';
const uri =
  process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.MONGODB_PROD_USERNAME}:${process.env.MONGODB_PROD_PASSWORD}@104.161.43.62:27017/soundei?authSource=admin`
    : `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/soundei?authSource=admin`; // Add authSource=admin if needed

console.log(uri);

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
