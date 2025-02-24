import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Pageheader from '../Components/Pageheader/Pageheader';
import EventManager from '../Components/admin/EventManager';
import GalleryManager from '../Components/admin/GalleryManager';
import logowhite from '../assets/logowhite.jpg';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const { isAuthenticated, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/404');
    }
  }, [isAuthenticated, history]);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="admin-dashboard">
      <Pageheader
        title="Admin Dashboard"
        subtitle="Manage your events and gallery"
        backgroundImage="https://picsum.photos/1920/1080?random=20"
      />

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="admin-profile">
            <img 
              src={logowhite}
              alt="Admin"
              className="admin-avatar"
            />
            <h3>Admin</h3>
            <p className="admin-email">joyceshengjia@gmail.com</p>
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`db-nav-item ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <i className="fas fa-calendar-alt"></i>
              <span>Events Management</span>
            </button>
            <button
              className={`db-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              <i className="fas fa-images"></i>
              <span>Gallery Management</span>
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2>{activeTab === 'events' ? 'Events Management' : 'Gallery Management'}</h2>
            <p className="content-description">
              {activeTab === 'events' 
                ? 'Create, edit, and manage your upcoming and past events.'
                : 'Manage your photo gallery albums and images.'
              }
            </p>
          </div>

          <div className="content-body">
            {activeTab === 'events' ? (
              <EventManager />
            ) : (
              <GalleryManager />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 