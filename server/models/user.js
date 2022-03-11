const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    wallet_address: {
        type: String,
        unique: true,
    },
    user_name: {
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