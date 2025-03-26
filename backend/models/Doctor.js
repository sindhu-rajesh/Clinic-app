const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Ensures Mongoose generates a valid ObjectId
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 1 }, // Ensures experience is a positive number
    rating: { type: Number, required: true, min: 0, max: 5 }, // Ensures rating is between 0 and 5
    fees: { type: Number, required: true, min: 0 }, // Ensures fees are non-negative
    availability: {
      type: [String],
      required: true,
      validate: {
        validator: function (days) {
          return days.every((day) =>
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day)
          );
        },
        message: "Availability must be valid weekdays (Monday-Sunday).",
      },
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
