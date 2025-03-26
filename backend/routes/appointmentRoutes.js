const express = require("express");
const { bookAppointment } = require("../controllers/appointmentController.js");
const router = express.Router();

router.post("/book", bookAppointment);

module.exports = router;
