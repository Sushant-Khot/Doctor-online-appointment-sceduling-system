// controllers/doctorController.js
const db = require('../config/db'); 
const Doctor = require('../models/Doctor');

// Fetch doctors from the database
const getDoctors = async (name, specialization) => {
  let query = 'SELECT * FROM doctors';
  const queryParams = [];

  if (name || specialization) {
    query += ' WHERE';
    if (name) {
      query += ' name LIKE ?';
      queryParams.push(`%${name}%`);
    }
    if (specialization) {
      query += name ? ' AND specialization = ?' : ' specialization = ?';
      queryParams.push(specialization);
    }
  }

  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Create a new doctor in the database
const createDoctor = async (req, res) => {
  const { name, specialization, email, phone } = req.body;

  // Validate input
  if (!name || !specialization || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
      // Check if doctor already exists
      const existingDoctorQuery = "SELECT * FROM doctors WHERE email = ?";
      db.query(existingDoctorQuery, [email], (err, existingDoctor) => {
          if (err) {
              console.error('Database Error:', err);
              return res.status(500).json({ message: 'Server error', error: err });
          }
          
          if (existingDoctor.length > 0) {
              return res.status(400).json({ message: 'Doctor with this email already exists' });
          }

          // Insert doctor into the database
          const query = "INSERT INTO doctors (name, specialization, email, phone) VALUES (?, ?, ?, ?)";
          db.query(query, [name, specialization, email, phone], (err, result) => {
              if (err) {
                  console.error('Database Error:', err);
                  return res.status(500).json({ message: 'Error creating doctor', error: err });
              }
              res.status(201).json({ message: 'Doctor created successfully', doctorId: result.insertId });
          });
      });
  } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  const { id } = req.user; // Assuming the logged-in user ID is available in req.user

  try {
    const query = 'DELETE FROM doctors WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        // Check specifically for SQLSTATE '45000', triggered by the MySQL SIGNAL
        if (err.sqlState === '45000') {
          console.error('Trigger Error:', err.message); // Log trigger error for clarity
          return res.status(400).json({ message: 'Cannot delete doctor with pending appointments.' });
        }
        console.error('Database Error:', err.message); // Log general database errors
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      // If no rows were affected, the doctor was not found
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      // Successfully deleted
      res.status(200).json({ message: 'Doctor profile deleted successfully' });
    });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get Doctor profile
const getDoctorProfile = async (req, res) => {
  console.log('User from JWT:', req.user); // Check if `req.user` is populated
  const doctorId = req.user.id; // Assuming `req.user` contains authenticated user info

  if (!doctorId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const doctor = await Doctor.getDoctorById(doctorId); // Await for doctor retrieval

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor); // Send 200 status with the doctor profile
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getDoctors, createDoctor,  deleteDoctor, getDoctorProfile};