const { MongoClient } = require('mongodb');

const dbName = 'soundei';
const uri = `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/soundei?authSource=soundei`; // Add authSource=admin if needed

const client = new MongoClient(uri);

console.log(uri);
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Export the database connection
module.exports = { connectToDatabase };
