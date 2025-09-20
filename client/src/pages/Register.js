import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import '../styles/RegisterStyles.css';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select; // Destructure Option from Select

const Register = () => {
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      const res = await api.post('/auth/register', {
        username: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      if(res.data.success){
      message.success('Registration successful');
      navigate('/login'); // Redirect to login after successful registration
      }else{
        message.error(res.data.message || 'Something went wrong');      }
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      
      // Handle different error scenarios from backend
      if (err.response && err.response.data) {
        message.error(err.response.data.message || 'Registration failed!');
      } else {
        message.error('Server error, please try again later.');
      }
    }
  }

  return (
    <div className='form-container'>
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input type='text' />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type='email' />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input type='password' />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select your role!' }]}>
          <Select placeholder="Select Role">
            <Option value="Patient">Patient</Option> {/* Ant Design Option */}
            <Option value="Doctor">Doctor</Option> {/* Ant Design Option */}
          </Select>
        </Form.Item>
        <Link to="/login" className='m-2'>Already a user? Login here</Link>
        <Button type='primary' htmlType='submit' className='btn'>Register</Button> {/* Use Ant Design Button */}
      </Form>
    </div>
  );
}

export default Register;
