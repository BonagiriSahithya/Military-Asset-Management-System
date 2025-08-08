import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/Purchases.css';

export default function Purchases() {
  const [form, setForm] = useState({ assetType: '', assetName: '', quantity: '', baseId: '' });
  const [list, setList] = useState([]);

  const loadList = async () => {
    try {
      const response = await API.get('/purchases');
      setList(response.data);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/purchases', form);
      setForm({ assetType: '', assetName: '', quantity: '', baseId: '' });
      loadList();
    } catch (err) {
      console.error('Error adding purchase:', err);
      alert('Unauthorized: Only admin/logistics can add purchases.');
    }
  };

  return (
    <div className="purchases">
      <h2>Purchases</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Type" value={form.assetType} onChange={e => setForm({ ...form, assetType: e.target.value })} />
        <input placeholder="Name" value={form.assetName} onChange={e => setForm({ ...form, assetName: e.target.value })} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input type="number" placeholder="Base ID" value={form.baseId} onChange={e => setForm({ ...form, baseId: e.target.value })} />
        <button type="submit">Add Purchase</button>
      </form>
      <ul>
        {list.map(p => <li key={p.id}>{p.assetType} {p.assetName} - Qty: {p.quantity}</li>)}
      </ul>
    </div>
  );
}
