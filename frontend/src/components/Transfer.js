import React, { useState, useEffect } from 'react';
import API from '../api';
import './FormPage.css';

const Transfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({ fromBase: '', toBase: '', equipmentType: '', quantity: 0, date: '' });
  const [error, setError] = useState('');

  const fetchTransfers = async () => {
    try {
      const { data } = await API.get('/transfers');
      setTransfers(data);
    } catch (err) {
      setError('Failed to load transfers');
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/transfers', form);
      fetchTransfers();
      setForm({ fromBase: '', toBase: '', equipmentType: '', quantity: 0, date: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create transfer');
    }
  };

  return (
    <div className="form-page">
      <h2>Transfers</h2>
      {error && <p className="error-text">{error}</p>}

      <form className="form-container" onSubmit={handleSubmit}>
        <input name="fromBase" placeholder="From Base" value={form.fromBase} onChange={handleChange} required />
        <input name="toBase" placeholder="To Base" value={form.toBase} onChange={handleChange} required />
        <input name="equipmentType" placeholder="Equipment Type" value={form.equipmentType} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <button type="submit" className="btn">Add Transfer</button>
      </form>

      <h3>History</h3>
      <ul className="list-container">
        {transfers.map(t => (
          <li key={t._id}>
            <span className="date">{t.date.split('T')[0]}</span> — 
            <span className="highlight">{t.fromBase}</span> → <span className="highlight">{t.toBase}</span> — 
            {t.equipmentType} — Qty: {t.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transfer;
