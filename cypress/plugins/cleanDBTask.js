const { MongoClient, ObjectId } = require('mongodb');

const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      'mongodb://localhost',
      { useNewUrlParser: true },
      (error, client) => {
        if (error) {
          reject(error);
        }

        resolve([client.db('devduckCypress'), client]);
      }
    );
  });
};

const getPurgeCollection = db => collection => {
  return new Promise((resolve, reject) => {
    db.collection(collection).remove({}, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
};

const getInsert = db => (collection, data) => {
  return new Promise((resolve, reject) => {
    db.collection(collection).insertMany(data, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

module.exports = async () => {
  const [db, client] = await connect();
  const purgeCollection = getPurgeCollection(db);
  const insert = getInsert(db);

  await purgeCollection('users');
  await purgeCollection('articles');
  await purgeCollection('comments');

  await insert('users', [
    {
      _id: ObjectId('5e9c7ee31e76088ee9fabb1b'),
      updatedAt: new Date('2020-04-19T16:35:35.299Z'),
      createdAt: new Date('2020-04-19T16:35:35.299Z'),
      hash: '06f71ebe0a793739f7a9f59e89dc388749f8e0d9f8e6c988a6738187aa932b0fa9f30a49ae82135b2f1aad2bcb3f1ecdd33553dbe2483fb2549ef12dff0b8761a4debb9cc7c6857c38c0ffbe4503468485ae6b3a33e3d9287e58c3ebeaa8c761ca6b65938d02e0640286aa58417a18816a98ed5848fbc812ffe8c73c6eef2367e7e536022630a13372f0de49a567da3ab3ea534a48fe2d5d5f3e8b3027d32b46f22bf773e097849559a4707cc266e69c84adcb0b9090f45a851d4890232b9e4540d5dc870ab51a9b1b0e7cc39f52c84e6e991856c47060c44f336aa7b611f959aacc11314b27d7a1113d8aa62a3e84de78496760b717b8c59f0a7cf280e29e4e2fb318b67ed38c753ccd46104a2e9feef297474f526064a38bb9b38d1e082a3ae4617c1ef116e56c551181dd49109db056f94ff915ab17fc56dec2b7966862c0639b09bb58651c5345d221f2f155c2ee37a4a902a8f4f27afb4d692957e516e2e4b924ac98147d8bd2cca4990ce76b5f5dbf3d2b738c271e252e97fd631d3b273944e392a83070470d1dab7d5d9c28cdaa6ab103bb34d2c94384da5aa77d4adfac4e8f0df706cfb4e64ef561ef9a879d620ae3ff6963718b2f1bb7a87bb1d9329cb1f01ce44d67724ae88b59b790b48c1977b89e13a309bd30ca8b0fb5fb75e7249e3b50849e51e57ab5752e1119bc9d2b4783c40038f3a67f9faf7202d1c0bb',
      salt: 'cac40174b57db7861fe88d3a16d7a1ee',
      email: 'cypress@test.com',
      username: 'cypress',
      following: [],
      favorites: []
    }
  ]);

  await insert('articles', [
    ...([1, 2, 3, 4, 5].map(i => ({
      updatedAt: new Date('2020-03-18T16:40:08.510Z'),
      createdAt: new Date('2020-03-18T16:40:08.510Z'),
      slug: `cypress-test-article-${i}`,
      author: ObjectId('5e9c7ee31e76088ee9fabb1b'),
      title: `Cypress test article ${i}`,
      description: `Cypress test description ${i}`,
      body: `Lorem ipsum ${i} dolor sit amet, consectetur adipiscing elit. Ut sit amet sapien odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      tagList: [],
      comments: [],
      favoritesCount: 0
    }))),
  ]);

  client.close();

  return null;
};

