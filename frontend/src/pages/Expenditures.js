import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/Expenditures.css';

export default function Expenditures() {
  const [form, setForm] = useState({
    assetType: '',
    assetName: '',
    quantity: '',
    baseId: '',
    reason: '',
  });
  const [list, setList] = useState([]);

  const loadList = async () => {
    try {
      const response = await API.get('/expenditures');
      setList(response.data);
    } catch (err) {
      console.error('Error fetching expenditures:', err);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.assetType || !form.assetName || !form.quantity || !form.baseId) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await API.post('/expenditures', {
        ...form,
        quantity: Number(form.quantity),
        baseId: Number(form.baseId),
      });
      setForm({ assetType: '', assetName: '', quantity: '', baseId: '', reason: '' });
      loadList();
    } catch (err) {
      console.error('Error adding expenditure:', err);
    }
  };

  return (
    <div className="expenditures">
      <h2>Expenditures</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type"
          value={form.assetType}
          onChange={e => setForm({ ...form, assetType: e.target.value })}
          required
        />
        <input
          placeholder="Name"
          value={form.assetName}
          onChange={e => setForm({ ...form, assetName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Base ID"
          value={form.baseId}
          onChange={e => setForm({ ...form, baseId: e.target.value })}
          required
        />
        <input
          placeholder="Reason (optional)"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
        <button type="submit">Add Expenditure</button>
      </form>

      <ul>
        {list.map(p => (
          <li key={p.id}>
            {p.assetType} {p.assetName} - Qty: {p.quantity} {p.reason && `- Reason: ${p.reason}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
