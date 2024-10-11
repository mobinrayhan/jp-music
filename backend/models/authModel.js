const { connectToDatabase } = require('./db');
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
  favorites: ['audioId1', 'audioId2', 'audioId10'],
};
*/

exports.createNewUser = async function ({ username, password, email, role }) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const user = {
    username,
    password,
    email,
    role,
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
