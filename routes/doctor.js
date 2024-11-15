const express = require('express');
const router = express.Router();
//const Appointment = require('../models/appointment');
const authenticateToken = require('../middelwares/authMiddelware');
const { getDoctors,deleteDoctor, getDoctorProfile } = require('../controllers/doctorController');


// Get patient profile info
router.get('/doctorRoute/me', authenticateToken, getDoctorProfile);

// Get doctors with optional filters (specialization and name)
router.get('/doctors', async (req, res) => {
  const { specialization, name } = req.query; // Extract query parameters
  try {
    const doctors = await getDoctors(specialization, name);
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch doctors.' });
  }
});


// Route to delete a doctor by ID
router.delete('/doctors/:id', async (req, res) => {
  await deleteDoctor(req, res);
});

// Route to get a doctor by ID
router.get('/doctors/:id', async (req, res) => {
  await getDoctorById(req, res);
});

module.exports = router;
