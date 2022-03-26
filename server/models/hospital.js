const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
	hospital_name:{
        type:String
    },
	hospital_address:{
        type:String
    },
	hospital_phone:{
        type:String
    },
	hospital_profile:{
        type:String
    },
	hospital_wallet:{
        type:String
    },
	hospital_dayoff:{
        type:[Number]
    },
	hospital_open:{
        type:String
    },
	hospital_close:{
        type:String
    },
	hospital_summary:{
        type:String
    }
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;