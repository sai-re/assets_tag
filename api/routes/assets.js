const express = require('express');
const {mongo, dbUrl, dbName, dbCollect} = require('../config/db')
const router = express.Router();

router.get('/assets', (req, res) => {
    mongo.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) return console.error(err);

        const db = client.db(dbName);
        const collection = db.collection(dbCollect);

        collection.find().toArray((err, items) => {
            res.json(items);

            client.close();
        }); 
    })
});

module.exports = router;