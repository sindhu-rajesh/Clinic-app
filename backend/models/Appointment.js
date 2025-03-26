const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  timeSlot: String,
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
});
module.exports = mongoose.model("Appointment", appointmentSchema)

