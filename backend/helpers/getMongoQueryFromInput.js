const { ObjectId } = require('mongodb');

module.exports = getMongoQueryFromInput = (input) => {
  let query;

  if (ObjectId.isValid(input) && String(new ObjectId(input)) === input) {
    query = { _id: new ObjectId(input) }; // Treat input as userId
  } else if (typeof input === 'string' && input.includes('@')) {
    query = { email: input }; // Treat input as email
  } else {
    throw new Error('Invalid input: must be a valid ObjectId or an email');
  }

  return query;
};
