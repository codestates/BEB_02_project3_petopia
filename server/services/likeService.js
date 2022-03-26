const like = require("../models/like.js")

const insertLike = async(likeInfo) => {
    const {postId, walletAddress} = likeInfo;
    try {
        const newLike = new like({post_id:postId, wallet_address:walletAddress});
        await newLike.save();
        return newLike;
    } catch (error) {
        throw Error(error);
    }
}

<<<<<<< HEAD

=======
>>>>>>> 5c90051481d1ee0f30acaaf129a54c5ad7b56715
module.exports = {
    insertLike
}