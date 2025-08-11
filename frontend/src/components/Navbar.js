// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        borderBottom: '2px solid #444',
        background: 'linear-gradient(90deg, #00416A, #E4E5E6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        fontWeight: '600',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/purchase" style={linkStyle}>
          Purchases
        </Link>
        <Link to="/transfer" style={linkStyle}>
          Transfers
        </Link>
        <Link to="/assignment" style={linkStyle}>
          Assignments
        </Link>
        <Link to="/expenditure" style={linkStyle}>
          Expenditures
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff4d4d',
          border: 'none',
          borderRadius: 4,
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Logout
      </button>
    </nav>
  );
};

const linkStyle = {
  marginRight: 20,
  color: 'white',
  textDecoration: 'none',
  fontSize: 16,
  transition: 'color 0.3s',
};

export default Navbar;
