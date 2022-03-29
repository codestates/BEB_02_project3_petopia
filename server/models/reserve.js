const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    reserve_date: {
        type: String
    },
    reserve_time: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reserve_name: {
        type: String
    },
    pet_name: {
        type: String
    },
    reserve_phone: {
        type: String
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    expireAt: {
        type: String
    }
});

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;