const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String
    },
    address:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("data", dataSchema)