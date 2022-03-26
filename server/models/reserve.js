const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    reserve_date: {
        type: String
    },
    reserve_time: {
        type: String
    },
    user_id: {
        type: String
    },
    hospital_id: {
        type: String
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
});

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;