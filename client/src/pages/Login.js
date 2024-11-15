import React, { useState } from 'react'; // Import useState for loading state
import { Form, Input,message } from 'antd';
import '../styles/LoginStyles.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading

  const onFinishHandler = async (values) => {
    console.log(values); // Debug: Log the values submitted
    setLoading(true); // Set loading state to true

    try {
      // Attempt to log in
      const res = await axios.post('/api/auth/login', values);

      if (res.data.success) {
        // Store the JWT token
        localStorage.setItem('token', res.data.token);

        // Assuming the role is part of the user object in the response
        const { role } = res.data.user;

        // Navigate based on role
        if (role === 'User') {
          navigate('/User');
        } else if (role === 'Patient') {
          navigate('/PatientProfile');
        } else if (role === 'Doctor') {
          navigate('/DoctorProfile');
        } else {
          navigate('/home'); // Fallback in case no role matches
        }

        // Display success message
        message.success('Login successful');
      } else {
        // Handle failure (e.g. wrong credentials)
        message.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      message.error('Login failed. Please try again.');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Login Form</h3>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type='email' />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input type='password' />
        </Form.Item>
        <Link to="/register" className='m-2'>Not a user? Register here</Link>
        <button className='btn btn-primary' type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'} {/* Conditional text */}
        </button>
      </Form>
    </div>
  );
};

export default LoginPage;
