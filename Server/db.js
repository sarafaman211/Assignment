const mongo = require('mongoose');

const connectMongoDb = () => {
    mongo.connect(process.env.MONGO_URI, () => {
        console.log('Connected to Mongo Successfully'.yellow)
    })
}

module.exports = connectMongoDb