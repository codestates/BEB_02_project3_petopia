const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
	reserve_date:{
        type: Date
    },
	reserve_time:{
        type: String
    },
	user_id:{
        type: String
    },
	hospital_id:{
        type: String
    },
});

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;