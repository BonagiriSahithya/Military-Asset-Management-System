// Login.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      console.log('Response data:', data); 
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#00416A' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: 400,
  margin: '80px auto',
  padding: 30,
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  width: '100%',
  padding: 10,
  marginBottom: 15,
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 16,
};

const buttonStyle = {
  padding: 12,
  backgroundColor: '#00416A',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 16,
};

export default Login;
