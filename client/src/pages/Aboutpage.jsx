import './Aboutpage.css'
import Pageheader from '../Components/Pageheader/Pageheader'

import React from 'react'

const Aboutpage = () => {
  return (
    <div className="about">
      <Pageheader 
        title="About Us"
        description="Learn about our mission and values"
        backgroundImage="https://picsum.photos/1920/1080?random=11"/>
      
      {/* First Section */}
      <div className="py-16">
        <div className="about-section">
          <div>
            <img
              src="https://picsum.photos/800/600?random=1"
              alt="About our mission"
              className="about-image"
            />
          </div>
          <div className="about-content">
            <h2 className="section-title">Our Story</h2>
            <p className="section-description">
            Our journey began with a simple idea: to create events that bring people together. Since our inception, we've grown from hosting small gatherings to organizing major cultural festivals that 
            draw hundreds to thousands of attendees.
            </p>
            <p className="section-description">
            We take pride in hosting a diverse range of events, from grand galas to casual gatherings, while offering a platform for artists, performers, and community members to showcase their talents and share their stories with broader audiences.
            </p>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="py-16 bg-gray-50">
        <div className="about-section">
          <div className="about-content">
            <h2 className="section-title">Our Mission
            </h2>
            <p className="section-description">
            Our mission is to unite and empower the remarkable women of New York—visionary, successful individuals who uplift and inspire one another. This community is a haven for connection, where members share their journeys, celebrate achievements, and build lasting relationships.
            </p>
          </div>
          <div>
            <img
              src="https://picsum.photos/800/600?random=2"
              alt="Our journey"
              className="about-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutpage