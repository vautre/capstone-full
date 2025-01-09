import React from 'react';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home';
import About from './Components/About/About'
import Title from './Components/Title/Title'
import Team from './Components/Team/Team'

import { Link, Route, Switch } from 'react-router-dom';
import AboutUs from './pages/Aboutpage';
import Gallery from './pages/Gallery';
import Upcoming from './pages/Upcoming';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Loginform from './pages/Loginform';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <div className='container'>
        <About />
        <Title subTitle="BOOP" title="MEET OUR TEAM" />
        <Team />
        <Title subTitle="Gallery" title="Event photos" />
      </div>

      <div className='page-container'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/upcoming-events" component={Upcoming} />
          <Route path="/membership" component={Membership} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/login" component={Loginform} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
