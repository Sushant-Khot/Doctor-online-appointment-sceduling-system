const Appointment = require('../models/appointment');

// Create Appointment function
const createAppointment = async (req, res) => {
    console.log(req.body);
    
    // Destructuring the request body
    const { patient_id, doctor_id, patient_name, email, mobile, appointment_date,timeslot, specialization, doctor_name, status } = req.body;

    // Validation: Check for missing required fields
    if (!patient_id || !doctor_id || !patient_name || !appointment_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Call the static create method to insert the appointment in the DB
        const newAppointment = await Appointment.create(
            patient_id, 
            doctor_id, 
            patient_name, 
            email, 
            mobile, 
            appointment_date, 
            specialization,
            timeslot, 
            doctor_name, 
            status || 'Pending'  // Default status to 'Pending' if not provided
        );

        // Send success response with the created appointment details
        return res.status(201).json({
            message: 'Appointment created successfully',
            appointment: newAppointment
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        // Send error response in case of server failure
        return res.status(500).json({ message: 'Server error' });
    }
};



//get all appointments
const getAppointments=async (req, res) => {
    const { patient_name, appointment_date, specialization } = req.query; // Extract query parameters
  
    try {
      const appointments = await new Promise((resolve, reject) => {
        Appointment.getAppointments(patient_name, appointment_date, specialization, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
  }



// Get Appointments by Patient ID
const getDoctorAppointments = async (req, res) => {
    const doctorId = req.user.id; // Get patient ID from the authenticated user
  
    try {
      const appointments = await Appointment.getAppointmentsByDoctorId(doctorId);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Get Appointments by Patient ID
const getPatientAppointments = async (req, res) => {
    const patientId = req.user.id; // Get patient ID from the authenticated user
  
    try {
      const appointments = await Appointment.getAppointmentsByPatientId(patientId);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
    const { appointment_id } = req.params;
    const { status } = req.body;

    try {
        await Appointment.updateStatus(appointment_id, status);
        res.status(200).json({ message: 'Appointment status updated successfully' });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
    const { appointment_id } = req.params;

    try {
        await Appointment.delete(appointment_id);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getDoctorAppointments,
    getPatientAppointments,
    updateAppointmentStatus,
    deleteAppointment,
};
