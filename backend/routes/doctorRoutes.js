/** @format */

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Doctor = require('../models/Doctor.js');
const doctorsData = require('../data/doctors.json');

const router = express.Router();

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  'mongodb+srv://guvi:guvi123@cluster0.yej84.mongodb.net/Clinic-Website?retryWrites=true&w=majority'

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS Stream
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// GridFS Storage Engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads',
  }),
});

const upload = multer({ storage });

// ✅ Insert sample doctors from JSON file
// router.post('/add', async (req, res) => {
//   try {
//     await Doctor.insertMany(doctorsData);
//     res.status(201).json({ message: 'Doctors added successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding doctors', error });
//   }
// });
router.post('/add', async (req, res) => {
  try {
    console.log('Inserting doctors:', doctorsData); // Debugging
    const result = await Doctor.insertMany(doctorsData);
    res
      .status(201)
      .json({ message: 'Doctors added successfully!', data: result });
  } catch (error) {
    console.error('InsertMany Error:', error); // Log full error
    res
      .status(500)
      .json({ message: 'Error adding doctors', error: error.message });
  }
});

// ✅ Fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

// Get single doctor by ID
router.get('/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.json(doctor);
});

// ✅ Image Upload Route
router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ file: req.file });
});

// ✅ Get Image by Filename
router.get('/image/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving image' });
  }
});

module.exports = router;
