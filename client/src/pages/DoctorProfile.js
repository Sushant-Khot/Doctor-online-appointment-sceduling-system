import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, Popconfirm, message } from 'antd';

const DoctorProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const navigate = useNavigate();

  // Fetch doctor information
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:8080/api/doctorRoute/me', config);
        console.log('Doctor Info Response:', response.data);
        setDoctorInfo(response.data);
      } catch (error) {
        console.error('Error fetching doctor info:', error);
        message.error('Failed to fetch doctor info.');
      }
    };

    fetchDoctorInfo();
  }, []);

  

  // Fetch appointments based on logged-in patient ID
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        // Change: Include patient ID in the appointment fetch request
        const doctorId = doctorInfo?.id; // Get patient ID from patientInfo
        const response = await axios.get(`http://localhost:8080/api/appointments/Doctor`, config);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        message.error('Failed to fetch appointments.');
      }
    };

    if (doctorInfo) { // Change: Ensure patientInfo is available before fetching appointments
      fetchAppointments();
    }
  }, [doctorInfo]); // Change: Add patientInfo as a dependency

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(`/api/appointments/${appointmentId}/status`, { status });
      message.success(`Appointment ${status} successfully`);
      setAppointments(appointments.map((appt) =>
        appt.id === appointmentId ? { ...appt, status } : appt
      ));
    } catch (error) {
      message.error(`Failed to ${status} the appointment.`);
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`http://localhost:8080/api/auth/profile`, config);
      console.log('Delete response:', response); // Log success response if it occurs
      message.success('Profile deleted successfully');
      navigate('/');
    } catch (error) {
      console.log('Delete error response:', error.response); // Log error response for debugging
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        message.error('Error deleting profile');
      }
    }
  };
  
  

  // Navigate to home page
  const Home = () => {
    navigate('/');
  };

  const appointmentColumns = [
    {
      title: 'Doctor Name',
      dataIndex: 'doctor_name',
      key: 'DoctorName',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patientName',
    },
    {
      title: 'Date',
      dataIndex: 'appointment_date',
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
        <div>
          <Button
            type="primary"
            onClick={() => updateAppointmentStatus(record.id, 'approved')}
            disabled={record.status === 'approved'}
            style={{ marginRight: '8px' }}
          >
            Approve
          </Button>
          <Button
            type="danger"
            onClick={() => updateAppointmentStatus(record.id, 'canceled')}
            disabled={record.status === 'canceled'}
            style={{ marginRight: '8px' }}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="doctor-profile">
      <h1>Doctor Profile</h1>

      {/* Display Doctor Information */}
      {doctorInfo && (
        <div className="doctor-info">
          <h2>Doctor Information</h2>
          <p><strong>Name:</strong> {doctorInfo.username}</p>
          <p><strong>Email:</strong> {doctorInfo.email}</p>
        </div>
      )}

      {/* Appointments Section */}
      <div className="appointment-section">
        <h2>Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <Table columns={appointmentColumns} dataSource={appointments} rowKey="id" />
        )}
      </div>

      {/* Action Buttons */}
      <div className="actions">
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

export default DoctorProfilePage;
