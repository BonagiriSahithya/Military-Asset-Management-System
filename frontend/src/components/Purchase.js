import React, { useState, useEffect } from 'react';
import API from '../api';
import './FormPage.css';

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({ base: '', equipmentType: '', quantity: 0, date: '' });
  const [error, setError] = useState('');

  const fetchPurchases = async () => {
    try {
      const { data } = await API.get('/purchases');
      setPurchases(data);
    } catch (err) {
      setError('Failed to load purchases');
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/purchases', form);
      fetchPurchases();
      setForm({ base: '', equipmentType: '', quantity: 0, date: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create purchase');
    }
  };

  return (
    <div className="form-page">
      <h2>Purchases</h2>
      {error && <p className="error-text">{error}</p>}

      <form className="form-container" onSubmit={handleSubmit}>
        <input name="base" placeholder="Base" value={form.base} onChange={handleChange} required />
        <input name="equipmentType" placeholder="Equipment Type" value={form.equipmentType} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <button type="submit" className="btn">Add Purchase</button>
      </form>

      <h3>History</h3>
      <ul className="list-container">
        {purchases.map(p => (
          <li key={p._id}>
            <span className="date">{p.date.split('T')[0]}</span> — 
            <span className="highlight">{p.base}</span> — 
            {p.equipmentType} — Qty: {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
