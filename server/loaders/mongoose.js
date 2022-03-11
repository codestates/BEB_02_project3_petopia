const config = require("../config/config.js");
const mongoose = require("mongoose");

module.exports = (app) => {
    const connection = mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.log(err);
    });
}