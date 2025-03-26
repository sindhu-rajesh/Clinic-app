const Appointment = require("../models/Appointment.js");

exports.bookAppointment = async (req, res) => {
  const { doctorId, userId, date, time } = req.body;

  const appointment = new Appointment({
    doctor: doctorId,
    patient: userId,
    date,
    time,
  });

  await appointment.save();
  res.json({ message: "Appointment booked successfully" });
};
