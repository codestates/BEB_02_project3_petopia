const express = require("express");
const cors = require("cors");
const config = require("../config/config.js");
const routes = require("../routes/index.js");

module.exports = (app) => {
    const corsOption = {
        orgin: `http://localhost:${config.port}`,
        credentials: true
    }

    app.use(cors(corsOption));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', routes);
}