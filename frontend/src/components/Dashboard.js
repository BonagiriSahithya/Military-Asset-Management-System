// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('Please login first');
    return;
  }

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get('/dashboard');
      setMetrics(data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    }
  };
  fetchDashboard();
}, []);


  if (error)
    return (
      <p
        style={{
          color: 'red',
          textAlign: 'center',
          marginTop: 50,
          fontWeight: '600',
          fontSize: 18,
        }}
      >
        {error}
      </p>
    );
  if (!metrics)
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: 50,
          fontWeight: '600',
          fontSize: 18,
          color: '#00416A',
        }}
      >
        Loading...
      </p>
    );

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00416A', textAlign: 'center', marginBottom: 30 }}>
        Dashboard
      </h2>
      <div style={metricsGrid}>
        <MetricCard label="Opening Balance" value={metrics.openingBalance} />
        <MetricCard label="Closing Balance" value={metrics.closingBalance} />
        <MetricCard label="Net Movement" value={metrics.netMovement} />
        <MetricCard label="Assigned" value={metrics.assigned} />
        <MetricCard label="Expended" value={metrics.expended} />
      </div>
    </div>
  );
};

const MetricCard = ({ label, value }) => (
  <div
    style={{
      backgroundColor: '#e7f0fd',
      borderRadius: 8,
      padding: 20,
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontWeight: '600',
      fontSize: 18,
      color: '#00416A',
    }}
  >
    <p style={{ marginBottom: 8, fontSize: 14, color: '#555' }}>{label}</p>
    <p>{value}</p>
  </div>
);

const containerStyle = {
  maxWidth: 800,
  margin: '60px auto',
  padding: 30,
  borderRadius: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const metricsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: 20,
};

export default Dashboard;
