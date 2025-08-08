import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/signup" />; // Redirect to signup if not authenticated
  }

  return children;
}
