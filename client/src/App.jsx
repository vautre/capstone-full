import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Title from './Components/Title/Title';
import Team from './Components/Team/Team';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import AboutUs from './pages/Aboutpage';
import Gallery from './pages/Gallery';
import Upcoming from './pages/Upcoming';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Loginform from './pages/Loginform';
import Signup from './pages/Signup';

import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import NotFound from './pages/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <div>
                <Home />
                <div className="container">
                  <Title subTitle="BOOP" title="MEET OUR TEAM" />
                  <Team />
                  <Title subTitle="Gallery" title="Event photos" />
                </div>
              </div>
            </Route>
            <Route path="/about-us" component={AboutUs} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/upcoming-events" component={Upcoming} />
            <Route path="/membership" component={Membership} />
            <Route path="/contact-us" component={Contact} />
            <Route path="/login" component={Loginform} />
            <Route path="/admin-dashboard" render={() => (
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            )} />
            <Route path="/register" component={Signup} />
            <Route path="/404" component={NotFound} />
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
          <Newsletter />
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
