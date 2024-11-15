const db = require('../config/db');

// Appointment model
class Appointment {
    // Fetch appointments with optional filters
    static getAppointments(patient_name, appointment_date, specialization, callback) {
        let query = 'SELECT * FROM appointments WHERE 1 = 1';
        const queryParams = [];
    
        if (patient_name) {
            query += ' AND patient_name LIKE ?';
            queryParams.push(`%${patient_name}%`);
        }
    
        if (appointment_date) {
            query += ' AND appointment_date = ?';
            queryParams.push(appointment_date);
        }
    
        if (specialization) {
            query += ' AND specialization = ?';
            queryParams.push(specialization);
        }
    
        db.query(query, queryParams, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    // Create a new appointment
    // Static method to create a new appointment in the database
    static async create(patient_id, doctor_id, patient_name, email, mobile, appointment_date, specialization, timeslot, doctor_name, status = 'Pending') {
        const query = `
            INSERT INTO appointments 
            (patient_id, doctor_id, patient_name, email, mobile, appointment_date, specialization, timeslot, doctor_name, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        // Return a Promise that resolves the newly created appointment
        return new Promise((resolve, reject) => {
            db.query(
                query, 
                [patient_id, doctor_id, patient_name, email, mobile, appointment_date, specialization, timeslot, doctor_name, status],  // Added 'timeslot' in the array
                (err, results) => {
                    if (err) {
                        return reject(err);  // Reject if there's an error
                    }
    
                    // Resolve with appointment details, including the insertId
                    resolve({ 
                        id: results.insertId, 
                        patient_id, 
                        doctor_id, 
                        patient_name, 
                        email, 
                        mobile, 
                        appointment_date, 
                        specialization,
                        timeslot,  // Include 'timeslot' in the resolved object
                        doctor_name, 
                        status 
                    });
                }
            );
        });
    }
    

    // Find appointments by patient ID
    static getAppointmentsByDoctorId(doctorId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM appointments WHERE doctor_id = ?';
            db.query(query, [doctorId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Find appointments by patient ID
    static getAppointmentsByPatientId(patientId) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM appointments WHERE patient_id = ?';
          db.query(query, [patientId], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    }

    // Update appointment status
    static async updateStatus(appointment_id, status) {
        const query = "UPDATE appointments SET status = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [status, appointment_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Delete an appointment
    static async delete(appointment_id) {
        const query = "DELETE FROM appointments WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [appointment_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Find appointment by ID
    static async findById(appointment_id) {
        const query = "SELECT * FROM appointments WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [appointment_id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
}

module.exports = Appointment;
