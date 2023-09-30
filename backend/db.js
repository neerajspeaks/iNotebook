const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () => {
    mongoose.connect(mongoURI);
    console.log('Connected to Mongo DB successfully.');
};

module.exports = connectToMongo;