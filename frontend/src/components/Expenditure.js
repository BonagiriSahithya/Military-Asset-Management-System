import React, { useState, useEffect } from 'react';
import API from '../api';

const Expenditure = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({
    base: '',
    equipmentType: '',
    quantity: '',
    date: '',
    reason: ''
  });
  const [error, setError] = useState('');

  const fetchExpenditures = async () => {
    try {
      const { data } = await API.get('/expenditures');
      setExpenditures(data);
    } catch {
      setError('Failed to load expenditures');
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/expenditures', form);
      fetchExpenditures();
      setForm({ base: '', equipmentType: '', quantity: '', date: '', reason: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create expenditure');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Expenditures</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <input style={inputStyle} name="base" placeholder="Base" value={form.base} onChange={handleChange} required />
          <input style={inputStyle} name="equipmentType" placeholder="Equipment Type" value={form.equipmentType} onChange={handleChange} required />
          <input style={inputStyle} name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
          <input style={inputStyle} name="date" type="date" value={form.date} onChange={handleChange} required />
          <input style={inputStyle} name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} required />
          <button style={buttonStyle} type="submit">Add Expenditure</button>
        </form>

        <h3 style={subtitleStyle}>History</h3>
        <ul style={listStyle}>
          {expenditures.map(e => (
            <li key={e._id} style={listItemStyle}>
              {e.date.split('T')[0]} — <strong>{e.base}</strong> — {e.equipmentType} — Qty: {e.quantity} — Reason: {e.reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const pageStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1597255682194-6d1dbb3dfcc5?auto=format&fit=crop&w=1470&q=80")',
  backgroundSize: 'cover',
  minHeight: '100vh',
  padding: '40px 20px',
};

const containerStyle = {
  maxWidth: 800,
  margin: 'auto',
  background: 'rgba(255,255,255,0.9)',
  borderRadius: 8,
  padding: 20,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  fontFamily: "'Segoe UI', sans-serif",
};

const formStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 10,
  marginBottom: 20,
};

const inputStyle = {
  padding: 8,
  borderRadius: 4,
  border: '1px solid #ccc',
};

const buttonStyle = {
  gridColumn: '1 / -1',
  padding: 10,
  backgroundColor: '#00416A',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

const titleStyle = { textAlign: 'center', marginBottom: 20, color: '#00416A' };
const subtitleStyle = { marginTop: 20, color: '#333' };

const listStyle = { listStyle: 'none', padding: 0, marginTop: 10 };
const listItemStyle = { background: '#f4f7fb', padding: 10, borderRadius: 4, marginBottom: 8 };

export default Expenditure;