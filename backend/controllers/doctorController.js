const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
    try {
        const doctors = req.body; // Ensure the request body does not contain _id
        const newDoctors = await Doctor.insertMany(doctors); // Bulk insert
        res.status(201).json({ message: "Doctors added successfully", data: newDoctors });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error adding doctors", error: error.message });
    }
};
