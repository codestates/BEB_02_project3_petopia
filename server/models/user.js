const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    greetings: {
        type: String
    },
    profile_image: {
        type: String
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;