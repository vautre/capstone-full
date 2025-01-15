import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Title from './Components/Title/Title';
import Team from './Components/Team/Team';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';

import { Route, Switch } from 'react-router-dom';
import AboutUs from './pages/Aboutpage';
import Gallery from './pages/Gallery';
import Upcoming from './pages/Upcoming';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Loginform from './pages/Loginform';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div>
            <Home />
            <div className="container">
              <About />
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
        <Route path="/register" component={Signup} />
      </Switch>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default App;
