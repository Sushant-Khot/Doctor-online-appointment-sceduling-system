const patientModel = require('../models/patientModel');

// Create a new patient
exports.createPatient = async (req, res) => {
  const data = req.body;

  // Validate patient data
  if (!patientModel.validateData(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const id = await patientModel.create(data); // Await patient creation
    res.status(201).json({ id, message: 'Patient created successfully' });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get patient profile
exports.getPatientProfile = async (req, res) => {
  console.log('User from JWT:', req.user); // Check if `req.user` is populated
  const patientId = req.user.id; // Assuming `req.user` contains authenticated user info

  if (!patientId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const patient = await patientModel.getPatientById(patientId); // Await for patient retrieval

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient); // Send 200 status with the patient profile
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  console.log('User from JWT:', req.user); 
  const patientId = req.user.id;

  if (!patientId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const patient = await patientModel.deletePatientProfile(patientId); // Await delete operation

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
