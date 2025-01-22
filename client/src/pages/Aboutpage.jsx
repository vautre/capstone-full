import './Aboutpage.css'
import Pageheader from '../Components/Pageheader/Pageheader'
import dav from '../assets/members/dav.jpg'
import j from '../assets/members/j.jpg'
import mon from '../assets/members/mon.jpg'

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
              src="https://res.cloudinary.com/dyqbbdguz/image/upload/v1737568079/cny_hwiuq3.jpg"
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
        <div className="about-section2">
          <div className="about-content">
            <h2 className="section-title">Our Mission
            </h2>
            <p className="section-description">
            Our mission is to unite and empower the remarkable women of New York—visionary, successful individuals who uplift and inspire one another. This community is a haven for connection, where members share their journeys, celebrate achievements, and build lasting relationships.
            </p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dyqbbdguz/image/upload/v1737568225/dav20244_pdwlyr.jpg"
              alt="Our journey"
              className="about-image"
            />
          </div>
        </div>
      </div>

      <div className="py-16 team-section-hex">
        <div className="team-container">
          <h4 className="team-title-hex">Meet Our Team</h4>          
          <div className="team-grid-hex">
            <div className="team-card-hex">
              <div className="hex-container">
                <div className="hex-image-wrap">
                  <img
                    src={dav}
                    alt="dav"
                    className="hex-image"
                  />
                </div>
                <div className="hex-content">
                  <div className="hex-inner">
                    <h3 className="hex-name">David Tai</h3>
                    <div className="hex-social">
                      <a href="https://www.instagram.com/drdavidtai/" className="hex-social-link"><i className="fab fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hex-details">
                <h2 className="hex-title">Founder, CEO</h2>
                <div className="hex-expertise">
                  <span>Team Leadership</span>
                  <span>Event-Management</span>
                  <span>Brand Development</span>
                </div>
              </div>
            </div>

            <div className="team-card-hex">
              <div className="hex-container">
                <div className="hex-image-wrap">
                  <img
                    src={j}
                    alt="Joyce Sheng"
                    className="hex-image"
                  />
                </div>
                <div className="hex-content">
                  <div className="hex-inner">
                    <h3 className="hex-name">Joyce Sheng</h3>
                    <div className="hex-social">
                      <a href="https://www.instagram.com/joyceshengjia/" className="hex-social-link"><i className="fab fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hex-details">
              <h3 className="hex-title">Vice President, Software Engineer</h3>
                <div className="hex-expertise">
                  <span>Full-Stack Development</span>
                  <span>UI/UX Design</span>
                  <span>Public Relations</span>
                </div>
              </div>
            </div>

            <div className="team-card-hex">
              <div className="hex-container">
                <div className="hex-image-wrap">
                  <img
                    src={mon}
                    alt="Monica Pan"
                    className="hex-image"
                  />
                </div>
                <div className="hex-content">
                  <div className="hex-inner">
                    <h3 className="hex-name">Monica Pan</h3>
                    <div className="hex-social">
                    <a href="https://www.instagram.com/monicapyh/" className="hex-social-link"><i className="fab fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hex-details">
                <h3 className="hex-title">Chief Marketing Officer</h3>
                <div className="hex-expertise">
                  <span>Content Marketing</span>
                  <span>Advertising Strategy</span>
                  <span>Influencer Outreach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutpage