const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors'); 

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const patientRoutes = require('./routes/patientRoutes');

// dotenv config (should be at the top)
dotenv.config();


// Create Express app instance
const app = express();

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'Abed@123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },  // Use secure: false for development
}));

// Routes
app.get('/', (req, res) => res.status(200).send({
  message: "Server is running",
}));
app.use('/api/auth', authRoutes);
app.use('/api', doctorRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', patientRoutes);

// Port
const port = process.env.PORT || 8080;

// Listen on port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_ENV} Mode on port ${port}`.bgCyan.white
    );       
});
