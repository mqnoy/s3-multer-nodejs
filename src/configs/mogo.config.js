
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectMongo = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, // To use the new parser,
        useUnifiedTopology: true, // To use the new Server Discover and Monitoring engine
        dbName: process.env.MONGODB_DATABASE
    });
}


module.exports = connectMongo;