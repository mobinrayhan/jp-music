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
  downloads: ['audioId1', 'audioId2', 'audioId10'],
  favorites: ['audioId1', 'audioId2', 'audioId10'],
};
*/

exports.createNewUser = async function (username, password, email) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const user = {
    username,
    password,
    email,
    playlists: [],
    downloads: [],
    favorites: [],
  };
  console.log(user);

  // return database.collection('users').insertOne(user);
};

exports.findUser = async function (email) {
  const db = await connectToDatabase();
  const collection = await db.collection('users');

  console.log(email);
};
