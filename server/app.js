const express = require("express");
const config = require("./config/config.js");
const loaders = require("./loaders/index.js");

const app = express();
const port = config.port || 4000;

loaders(app);

const startServer =  app.listen(port, () => {
    console.log(`Express server starting on port ${port}`);
}).on('error', err => {
    process.exit(1);
});

module.exports = {startServer};