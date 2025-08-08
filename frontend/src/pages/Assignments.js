import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/App.css';

export default function Assignments() {
  const [form, setForm] = useState({
    assetType: '',
    assetName: '',
    quantity: '',
    baseId: '',
    assignedTo: '',
  });
  const [list, setList] = useState([]);

  const loadList = async () => {
    try {
      const response = await API.get('/assignments');
      setList(response.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.assetType || !form.assetName || !form.quantity || !form.baseId || !form.assignedTo) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await API.post('/assignments', {
        ...form,
        quantity: Number(form.quantity),
        baseId: Number(form.baseId),
      });
      setForm({ assetType: '', assetName: '', quantity: '', baseId: '', assignedTo: '' });
      loadList();
    } catch (err) {
      console.error('Error adding assignment:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Assignments</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type"
          value={form.assetType}
          onChange={e => setForm({ ...form, assetType: e.target.value })}
        />
        <input
          placeholder="Name"
          value={form.assetName}
          onChange={e => setForm({ ...form, assetName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Base ID"
          value={form.baseId}
          onChange={e => setForm({ ...form, baseId: e.target.value })}
        />
        <input
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={e => setForm({ ...form, assignedTo: e.target.value })}
        />
        <button type="submit">Add Assignment</button>
      </form>
      <ul>
        {list.map(p => (
          <li key={p.id}>
            {p.assetType} {p.assetName} - Qty: {p.quantity} - Assigned To: {p.assignedTo}
          </li>
        ))}
      </ul>
    </div>
  );
}
