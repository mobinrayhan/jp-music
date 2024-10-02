const { MongoClient } = require('mongodb');

const dbName = 'soundei';
const uri =
  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://${process.env.MONGODB_PROD_USERNAME}:${process.env.MONGODB_PROD_PASSWORD}@cluster0.am28l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    : `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/soundei?authSource=soundei`; // Add authSource=admin if needed

console.log(
  `mongodb+srv://${process.env.MONGODB_PROD_USERNAME}:${process.env.MONGODB_PROD_PASSWORD}@cluster0.am28l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

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
