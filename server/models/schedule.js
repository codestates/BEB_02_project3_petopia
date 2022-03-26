const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
	schedule_date:{
        type: Date
    },
	schedule_time:{
        type: String
    },
	user_id:{
        type: String
    },
	hospital_id:{
        type: String
    },
});

const Schedule = mongoose.model("Hospital", scheduleSchema);

module.exports = Schedule;