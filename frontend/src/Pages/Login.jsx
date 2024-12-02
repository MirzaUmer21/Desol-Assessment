import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async () => {
    try {
      const response = await axios.post(
        'http://localhost/v1/auth/login',
        values
      );
      message.success('Login successful!');
      navigate('/cars');
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          'Login failed. Please check your credentials.'
      );
    }
  };
  return (
    <div>
      {' '}
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <h2>Login</h2>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input type='email' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type='primary' htmlType='submit' block>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
