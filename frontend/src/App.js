import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Purchase from './components/Purchase';
import Transfer from './components/Transfer';
import Assignment from './components/Assignment';
import Expenditure from './components/Expenditure';
import Navbar from './components/Navbar';

// Accessible only if logged in
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Accessible only if NOT logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      {token && <Navbar />}

      <Routes>
        {/* Root path always shows Signup page */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Signup page - only if not logged in */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Login page - only if not logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/purchase"
          element={
            <PrivateRoute>
              <Purchase />
            </PrivateRoute>
          }
        />

        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />

        <Route
          path="/assignment"
          element={
            <PrivateRoute>
              <Assignment />
            </PrivateRoute>
          }
        />

        <Route
          path="/expenditure"
          element={
            <PrivateRoute>
              <Expenditure />
            </PrivateRoute>
          }
        />

        {/* Unknown routes redirect based on login */}
        <Route
          path="*"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
