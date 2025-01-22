import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import DiamondHong from '../assets/logos/DiamondHong.jpg';
import IMG_5155 from '../assets/logos/IMG_5155.jpg';
import lunarlogo from '../assets/logos/lunarlogo.png';
import TJCCNY from '../assets/logos/TJCCNY.png';
import maotai from '../assets/logos/maotai.jpg';
import heroVideo from '../assets/231177_small.mp4';

const Homepage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // your actual event date
  const nextEventDate = new Date('2025-02-23T17:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextEventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselEvents = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565361/arlo_mqf6kj.jpg',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565489/IMG_4293_p68m8u.jpg',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565504/IMG_5524_k9ta2q.jpg',
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565490/IMG_5328_jo1iot.jpg',
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565488/fushimi_rlllsu.jpg',
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565489/IMG_4724_upbz5q.jpg',
    },
    {
      id: 7,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565489/IMG_4399_zpxrvk.jpg',
    },
    {
      id: 8,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565489/IMG_3502_yukcxu.jpg',
    },
    {
      id: 9,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565507/IMG_8091_wfbn6v.jpg',
    },
    {
      id: 10,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565508/IMG_8488_irnza0.jpg',
    },
    {
      id: 11,
      image: 'https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565909/IMG_2200_k48fvy.jpg',
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      // If we're at the last slide (1), go back to first slide (0)
      if (prev === 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      // If we're at the first slide (0), go to last slide (1)
      if (prev === 0) {
        return 1;
      }
      return prev - 1;
    });
  };

  const partnerLogos = [
    {
      id: 1,
      logo: DiamondHong,
      name: 'DiamondHong'
    },
    {
      id: 2,
      logo: IMG_5155,
      name: 'idk'
    },
    {
      id: 3,
      logo: lunarlogo,
      name: 'Lunar'
    },
    {
      id: 4,
      logo: TJCCNY,
      name: 'TJCCNY'
    },
    {
      id: 5,
      logo: maotai,
      name: 'maotai'
    }
  ];

  return (
    <div className="homepage">
      <section className="hero-section">
        <video autoPlay muted loop className="hero-background">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Welcome to Our Community</h1>
          <p className="tagline">Elevate your NYC social experiences through our exclusive subscription-based service! Our mission is to create meaningful connections by curating and hosting unique events tailored to your interests. Whether you're looking to network, broaden your social circle, or simply make new friends, our events are designed to bring people together to enrich your personal and professional life.</p>
          <Link to="/upcoming-events" className='home-button'>VIEW PAST EVENTS</Link>
        </div>
      </section>

      {/* Events Gallery Carousel */}
      <section className="events-carousel">
        <h2>Past Events</h2>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>❮</button>
          <div className="carousel-track">
            <div className={`carousel-slide ${currentSlide === 0 ? 'active' : ''}`}>
              <div className="event-grid">
                {carouselEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="event-image-container">
                    <img src={event.image} alt="Event" className="event-image" />
                  </div>
                ))}
              </div>
            </div>
            <div className={`carousel-slide ${currentSlide === 1 ? 'active' : ''}`}>
              <div className="event-grid">
                {carouselEvents.slice(5).map((event) => (
                  <div key={event.id} className="event-image-container">
                    <img src={event.image} alt="Event" className="event-image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>❯</button>
        </div>
        <div className="carousel-dots">
          <span 
            className={`dot ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(0)}
          />
          <span 
            className={`dot ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(1)}
          />
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          {partnerLogos.map((partner) => (
            <div key={partner.id} className="partner-logo-container">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="partner-logo"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Event Countdown Section */}
      <section className="countdown-section">
        <h2>Next Big Event Coming Soon</h2>
        <div className="countdown-timer">
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
        <Link to="/upcoming-events" className="timer-button">Upcoming events</Link>
      </section>
    </div>
  );
};

export default Homepage;