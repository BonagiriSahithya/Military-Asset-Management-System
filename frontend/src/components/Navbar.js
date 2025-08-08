import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/signup'); // Redirect to signup on logout
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/purchases">Purchases</Link>
      <Link to="/transfers">Transfers</Link>
      <Link to="/assignments">Assignments</Link>
      <Link to="/expenditures">Expenditures</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
