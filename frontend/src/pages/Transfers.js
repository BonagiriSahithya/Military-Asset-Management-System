import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/Transfers.css';

export default function Transfers() {
  const [form, setForm] = useState({
    assetType: '',
    assetName: '',
    quantity: '',
    fromBaseId: '',
    toBaseId: '',
  });

  const [list, setList] = useState([]);

  const loadList = async () => {
    try {
      const response = await API.get('/transfers');
      setList(response.data);
    } catch (err) {
      console.error('Error fetching transfers:', err);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...form,
      quantity: Number(form.quantity),
      fromBaseId: Number(form.fromBaseId),
      toBaseId: Number(form.toBaseId),
    };

    try {
      await API.post('/transfers', postData);
      setForm({ assetType: '', assetName: '', quantity: '', fromBaseId: '', toBaseId: '' });
      loadList();
    } catch (err) {
      console.error('Error adding transfer:', err);
    }
  };

  return (
    <div className="transfers">
      <h2>Transfers</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Asset Type"
          value={form.assetType}
          onChange={e => setForm({ ...form, assetType: e.target.value })}
          required
        />
        <input
          placeholder="Asset Name"
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
          min={1}
        />
        <input
          type="number"
          placeholder="From Base ID"
          value={form.fromBaseId}
          onChange={e => setForm({ ...form, fromBaseId: e.target.value })}
          required
          min={1}
        />
        <input
          type="number"
          placeholder="To Base ID"
          value={form.toBaseId}
          onChange={e => setForm({ ...form, toBaseId: e.target.value })}
          required
          min={1}
        />
        <button type="submit">Add Transfer</button>
      </form>

      <ul>
        {list.map((transfer) => (
          <li key={transfer.id}>
            {transfer.assetType} {transfer.assetName} — Qty: {transfer.quantity} — From Base: {transfer.fromBaseId} To Base: {transfer.toBaseId}
          </li>
        ))}
      </ul>
    </div>
  );
}
