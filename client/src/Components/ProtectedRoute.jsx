import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, user } = useContext(AuthContext);

  console.log('Protected Route Status:', { 
    isAuthenticated, 
    isAdmin, 
    userEmail: user?.email,
    userIsAdmin: user?.isAdmin 
  });

  if (!isAuthenticated) {
    return <Redirect to="/admin-dashboard" />;
  }

  if (!isAdmin && !user?.isAdmin) {
    return <Redirect to="/404" />;
  }

  return children;
};

export default ProtectedRoute; 