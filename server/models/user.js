const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String
    },
    greetings: {
        type: String
    }
});

const user = mongoose.model("users", userSchema);

module.exports = user;