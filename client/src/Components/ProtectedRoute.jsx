import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // unauthorized user = redirect to login
    return <Redirect to="/login" />;
  }

  if (adminOnly && !user?.isAdmin) {
    // If logged in but not admin, redirect to home when trying to access admin routes
    return <Redirect to="/" />;
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute; 