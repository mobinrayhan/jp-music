const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');
/*
const user = {
  userName: 'mobin',
  password: 'ranmsdpoif',
  email: 'sdm241405@gmail.com',
  playlists: [
    { name: 'Playlist Name 1', audios: ['audioId1', 'audioId2', 'audioId10'] },
    { name: 'Playlist Name 3', audios: ['audioId1', 'audioId2', 'audioId10'] },
    {
      name: 'Playlist Name 15',
      audios: ['auddioId1', 'audioIsdd2', 'audioId10'],
    },
  ],
  downloads: [{date, 'audioId1'}, {date, 'audioId2'}, {date, 'audioId10'}],
  favorites: ['npm ', 'audioId2', 'audioId10'],
};
*/

exports.createNewUser = async function ({
  username,
  password,
  email,
  role,
  isActive,
}) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const user = {
    username,
    password,
    email,
    role,
    isActive,
    createdAt: new Date(),
    lastLogin: null,
    playlists: [],
    downloads: [],
    favorites: [],
  };

  return collection.insertOne(user);
};

exports.findUser = async function (email) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return await collection.findOne({ email });
};

exports.updateActiveStatus = async function (email, status) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return collection.updateOne({ email }, { $set: { isActive: status } });
};

exports.updatePasswordById = async function (userId, newPassword) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { password: newPassword } }
  );
};

exports.updateLastLogin = async function (email) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');
  return collection.updateOne({ email }, { $set: { lastLogin: new Date() } });
};
