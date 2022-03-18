const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    address: {
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

const User = mongoose.model("User", userSchema);

module.exports = User;