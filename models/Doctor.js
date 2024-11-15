const db = require('../config/db');

class Doctor {
  // Get all doctors, with optional filters by specialization and name
  static getDoctors(specialization, name) {
    let query = 'SELECT * FROM doctors WHERE 1 = 1';
    const queryParams = [];

    if (specialization) {
      query += ' AND specialization = ?';
      queryParams.push(specialization);
    }

    if (name) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${name}%`);
    }

    return new Promise((resolve, reject) => {
      db.query(query, queryParams, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Find a doctor by ID
  static getDoctorById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }



  // Delete a doctor
  static deleteDoctor(doctor_id) {
    const query = 'DELETE FROM doctors WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [doctor_id], (err, results) => {
        if (err) {
          // Check for SQLSTATE '45000' and handle it gracefully
          if (err.sqlState === '45000') {
            return reject(new Error('Cannot delete doctor with pending appointments.'));
          }
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = Doctor;
