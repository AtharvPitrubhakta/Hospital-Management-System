const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: true 
  },
  doctorName: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    // default: "pending",
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
