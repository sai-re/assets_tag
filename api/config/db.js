const mongo = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = "cards-db";
const dbCollect = 'assets';

module.exports = {
    mongo: mongo,
    dbUrl: dbUrl,
    dbName: dbName,
    dbCollect
}