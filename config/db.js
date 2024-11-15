const mysql = require('mysql2');
const dotenv = require('dotenv');
const colors=require('colors');

// Load environment variables from .env file
dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

// Export the database connection
module.exports = db;
