import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState({
    openingBalance: 0,
    closingBalance: 0,
    netMovement: 0,
    assignedAssets: 0,
    expendedAssets: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome</h1>
      <p>Opening Balance: {data.openingBalance}</p>
      <p>Closing Balance: {data.closingBalance}</p>
      <p>Net Movement: {data.netMovement}</p>
      <p>Assigned Assets: {data.assignedAssets}</p>
      <p>Expended Assets: {data.expendedAssets}</p>
    </div>
  );
}
