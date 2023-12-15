const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(env.db_url);
// console.log(env.db_url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the DB!"));

db.once('open', function () {
    console.log('Connected to Database::MongoDB');
});

module.exports = db;
