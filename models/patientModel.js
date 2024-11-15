const db = require('../config/db');

class Patient {
  static getPatientById(id) {
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

  static deletePatientProfile(patientId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.query(query, [patientId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }


  // Validate patient data
  static validateData({ username, email }) {
    if (!username || !email) {
      return false; // Basic validation to ensure name and email are provided
    }
    // Additional validation logic can be added here (e.g., email format)
    return true;
  }
}

module.exports = Patient;
























/*const db = require('../config/db');

class Patient {
  // Create a new patient
  static create({ name, email }) {
    const query = 'INSERT INTO patients (name, email) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [name, email], (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, name, email });
      });
    });
  }

  // Find patient by ID
  static findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
  // Delete a patient
  static delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Validate patient data
  static validateData({ name, email }) {
    if (!name || !email) {
      return false; // Basic validation to ensure name and email are provided
    }
    // Additional validation logic can be added here (e.g., email format)
    return true;
  }
}

module.exports = Patient;
*/