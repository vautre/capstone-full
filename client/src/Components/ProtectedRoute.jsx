import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && !user?.isAdmin) {
    return <Redirect to="/" />;
  }

  // If all checks pass -> Dash
  return children;
};

export default ProtectedRoute; 