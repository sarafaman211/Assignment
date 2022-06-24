var mongoose = require('mongoose');

var fakerSchema =  new mongoose.Schema({
    firstname:String,
    lastname:String,
    address: String,
    email: String,
    password: String
});

module.exports = mongoose.model('fakerCollection',fakerSchema);