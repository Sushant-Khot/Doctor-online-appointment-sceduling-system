const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticateToken = require('../middelwares/authMiddelware');


// Create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// get all new appointments
router.get('/appointments', appointmentController.getAppointments);

// Get appointments by doctor ID
router.get('/appointments/Doctor', authenticateToken, appointmentController.getDoctorAppointments);
  

// Get all appointments for a patient
router.get('/appointments/patient', authenticateToken, appointmentController.getPatientAppointments);

// Update appointment status
router.put('/appointments/:appointment_id/status', appointmentController.updateAppointmentStatus);

// Delete an appointment
router.delete('/appointments/:appointment_id', appointmentController.deleteAppointment);

module.exports = router;
