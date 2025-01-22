import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AboutUs from './pages/Aboutpage';
import Gallery from './pages/Gallery';
import Upcoming from './pages/Upcoming';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Loginform from './pages/Loginform';
import Signup from './pages/Signup';

import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { EventProvider } from './data/EventContext';

const App = () => {
  return (
    <EventProvider>
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <div>
                  <Homepage />
                </div>
              </Route>
              <Route path="/about-us" component={AboutUs} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/upcoming-events" component={Upcoming} />
              <Route path="/membership" component={Membership} />
              <Route path="/contact-us" component={Contact} />
              <Route path="/login" component={Loginform} />
              <Route path="/admin-dashboard" render={() => (
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              )} />
              <Route path="/register" component={Signup} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </EventProvider>
  );
};

export default App;
