const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    username: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

const NFT = mongoose.model("nfts", nftSchema);

module.exports = NFT;