const mongooseLoader = require("./mongoose.js");
const expressLoader = require("./express.js");

module.exports = (app) => {
    mongooseLoader(app);
    expressLoader(app);
}