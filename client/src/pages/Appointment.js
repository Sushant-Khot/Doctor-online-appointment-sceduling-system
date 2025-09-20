import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Appointment.css';

const { Option } = Select;

const Appointment = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [doctors, setDoctors] = useState([]); // To hold the fetched doctors
  const [filteredDoctors, setFilteredDoctors] = useState([]); // To hold filtered doctors based on specialization
  const [patientInfo, setPatientInfo] = useState(null);
  const specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'Orthopedics'];
  const timeslots = ['9:00-10:30', '11:00-1:00', '2:30-4:00', '6:00-9:00']; // Available timeslots

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

  // Handle specialization selection
  const handleSpecializationChange = (value) => {
    const filtered = doctors.filter(doctor => doctor.specialization === value);
    setFilteredDoctors(filtered);
  };

  const onFinishHandler = async (values) => {
    try {
      const selectedDoctor = filteredDoctors.find(doctor => doctor.id === values.doctor);

      await api.post('/appointments', {
        patient_id: patientInfo ? patientInfo.id : values.user,
        doctor_id: values.doctor,
        patient_name: values.name,
        email: values.email,
        mobile: values.phone,
        appointment_date: values.date.format('YYYY-MM-DD'),
        timeslot: values.timeslot,
        specialization: values.specialization,
        doctor_name: selectedDoctor ? selectedDoctor.name : '',
        status: 'Pending',
      });
      message.success('Appointment booked successfully!');
      navigate('/PatientProfile');
    } catch (err) {
      console.error('Booking error:', err.response ? err.response.data : err.message);
      message.error('Failed to book the appointment.');
    }
  };

  return (
    <>
    <div className="container">
      <h2>Book a Doctor Appointment</h2>
      <Form form={form} className="appointment-form" layout="vertical" onFinish={onFinishHandler}>
        {/* Name and Age side by side */}
        <div className="form-item-half">
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input className="input" />
          </Form.Item>
        </div>

        <div className="form-item-half">
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input className="input" />
          </Form.Item>
        </div>

        {/* Email and Date of Appointment side by side */}
        <div className="form-item-half">
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input className="input" />
          </Form.Item>
        </div>

        <div className="form-item-half">
          <Form.Item name="date" label="Date of Appointment" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker className="input" />
          </Form.Item>
        </div>

        {/* Specialization and Timeslot of Appointment side by side */}
        <div className="form-item-half">
          <Form.Item name="specialization" label="Specialization" rules={[{ required: true, message: 'Please select a specialization' }]}>
            <Select placeholder="Select specialization" className="input" onChange={handleSpecializationChange}>
              {specializations.map(spec => (
                <Option key={spec} value={spec}>{spec}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="form-item-half">
          <Form.Item name="timeslot" label="Timeslot" rules={[{ required: true, message: 'Please select a timeslot' }]}>
            <Select placeholder="Select timeslot" className="input">
              {timeslots.map(slot => (
                <Option key={slot} value={slot}>{slot}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Doctor field - Full width */}
        <div className="form-item-full">
          <Form.Item name="doctor" label="Doctor" rules={[{ required: true, message: 'Please select a doctor' }]}>
            <Select placeholder="Select doctor" className="input">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <Option key={doctor.id} value={doctor.id}>{doctor.name}</Option>
                ))
              ) : (
                <Option value="">No doctors available</Option>
              )}
            </Select>
          </Form.Item>
        </div>

        {/* Submit Button - Full width */}
        <div className="form-item-full">
          <Button type="primary" htmlType="submit" className="button">Book Now</Button>
        </div>
      </Form>
    </div>
    <div className="contact-info">
      <div className="contact-item">
       <h3>Our Address</h3>
       <p>F-985 Vivek Vihar Colony,<br /> Near New Bus Stand, Bangalore.</p>
      </div>
      <div className="contact-item">
        <h3>Phone No:</h3>
        <p>1800-7854-9635</p>
      </div>
      <div className="contact-item">
        <h3>Email:</h3>
       <p>bookonlineappointment@gmail.com</p>
      </div>
    </div>

  </>
  );
};

export default Appointment;
