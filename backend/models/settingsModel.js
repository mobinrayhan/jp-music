const { connectToDatabase } = require('./db');

exports.updateGeneral = async (finalData) => {
  const db = await connectToDatabase();
  const generalCollection = await db.collection('general');
  await generalCollection.deleteMany({});
  return generalCollection.insertMany(finalData);
};

exports.getGeneral = async () => {
  const db = await connectToDatabase();
  const generalCollection = await db.collection('general');
  return generalCollection.find({}).toArray();
};
