const express = require('express');
const router = express.Router();
const authenticateToken = require('../middelwares/authMiddelware');
const { getPatientProfile, deletePatient } = require('../controllers/patientController');


// Get patient profile info
router.get('/auth/getUserData', authenticateToken, getPatientProfile);

// Delete patient profile
router.delete('/auth/profile', authenticateToken, deletePatient);

module.exports = router;
