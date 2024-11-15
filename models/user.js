const db = require('../config/db');

// User model
class User {
    // Create a new user
    static async create(username, email, password, role) {
        const query = "CALL create_user(?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.query(query, [username, email, password, role], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Find a user by username
    static async findByUsername(username) {
        const query = "SELECT * FROM users WHERE username = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Find a user by email
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    console.error('Database Error:', err);
                    return reject(new Error('Failed to find user by email'));
                }
                resolve(results);
            });
        });
    }

    // Find user by ID (for profile retrieval)
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT username, email FROM users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Delete user
    static async deleteUser(id) {
        const query = "DELETE FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = User;
