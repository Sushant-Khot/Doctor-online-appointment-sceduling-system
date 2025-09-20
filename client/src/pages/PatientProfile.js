import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Button, Table, Popconfirm, message } from 'antd';

const PatientProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // State for storing doctors list
  const [patientInfo, setPatientInfo] = useState(null);
  const navigate = useNavigate();

  // Fetch patient information
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await api.get('/auth/getUserData');
        setPatientInfo(response.data); 
      } catch (error) {
        console.error('Error fetching patient info:', error);
        message.error('Failed to fetch patient info.');
      }
    };

    fetchPatientInfo();
  }, []);

  // Fetch appointments based on logged-in patient ID
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/patient');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        message.error('Failed to fetch appointments.');
      }
    };

    if (patientInfo) {
      fetchAppointments();
    }
  }, [patientInfo]);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        message.error('Failed to fetch doctors.');
      }
    };

    fetchDoctors();
  }, []);

  // Delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      await api.delete(`/appointments/${appointmentId}`);
      message.success('Appointment deleted successfully');
      setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      message.error('Error deleting appointment');
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    try {
      await api.delete('/auth/profile');
      message.success('Profile deleted successfully');
      navigate('/');
    } catch (error) {
      message.error('Error deleting profile');
    }
  };

  // Navigate to book appointment page
  const bookAppointment = () => {
    navigate('/Appointment');
  };

  //Navigate to home page
  const Home = () => {
    navigate('/');
  };

  const appointmentColumns = [
    {
      title: 'Doctor Name',
      dataIndex: 'doctor_name',
      key: 'doctorName',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Date',
      dataIndex:'appointment_time',
      key: 'date',
    },
    {
      title: 'Time slot',
      dataIndex: 'timeslot',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this appointment?"
          onConfirm={() => deleteAppointment(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const doctorColumns = [
    {
      title: 'Doctor Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Timeslots',
      dataIndex: 'timeslot',
      key: 'timeslot',
    },
  ];

  return (
    <div className="patient-profile">
      <h1>Patient Profile</h1>

      {/* Display Patient Information */}
      {patientInfo && (
        <div className="patient-info">
          <h2>Patient Information</h2>
          <p><strong>Name:</strong> {patientInfo.username}</p>
          <p><strong>Email:</strong> {patientInfo.email}</p>
          {/* Add other patient details as needed */}
        </div>
      )}

      {/* Appointments Section */}
      <div className="appointment-section">
        <h2>Past Appointments</h2>
        {appointments.length === 0 ? (
          <p>No past appointments.</p>
        ) : (
          <Table columns={appointmentColumns} dataSource={appointments} rowKey="id" />
        )}
      </div>

      {/* Doctors Section */}
      <div className="doctors-section">
        <h2>Available Doctors</h2>
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <Table columns={doctorColumns} dataSource={doctors} rowKey="id" />
        )}
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <Button type="primary" onClick={bookAppointment} style={{ marginRight: '10px' }}>
          Book Appointment
        </Button>
        <Popconfirm
          title="Are you sure you want to delete your profile?"
          onConfirm={deleteProfile}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" style={{ marginRight: '10px' }}>Delete Profile</Button>
        </Popconfirm>
        <Button type="primary" onClick={Home} style={{ marginRight: '10px' }}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default PatientProfilePage;
