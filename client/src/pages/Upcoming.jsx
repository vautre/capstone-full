import React, { useState } from 'react';
import { useEvents } from '../data/EventContext';
import './Upcoming.css';
import Pageheader from '../Components/Pageheader/Pageheader';


const Upcoming = () => {
  const { events } = useEvents();
  const [viewMode, setViewMode] = useState('list');

  const handleTicketClick = (ticketUrl, status) => {
    if (status !== 'sold-out' && ticketUrl) {
      window.open(ticketUrl, '_blank');
    }
  };

  return (
    <div className="events">
      <Pageheader
        title="Upcoming Events"
        subtitle="Join us for our upcoming events"
        backgroundImage="https://picsum.photos/1920/1080?random=12"/>
      
      <div className="events-container">
        <div className="events-header">
          <div className="view-toggle">
            <button 
              className={viewMode === 'list' ? 'active' : ''} 
              onClick={() => setViewMode('list')}>List</button>
            <button 
              className={viewMode === 'grid' ? 'active' : ''} 
              onClick={() => setViewMode('grid')}>Grid</button>
          </div>
        </div>

        <div className={`events-list ${viewMode}`}>
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-details">
                <div className="event-main-content">
                  <p className="event-presenter">{event.presenter}</p>
                  <h2 className="event-title">{event.title}</h2>
                  <button 
                    className={`event-button ${event.status === 'sold-out' ? 'sold-out' : ''}`}
                    disabled={event.status === 'sold-out'}
                    onClick={() => handleTicketClick(event.ticketUrl, event.status)}>{event.buttonText}</button>
                </div>
                <div className="event-datetime">
                  <div className="date"> 
                    <i class="fa-regular fa-calendar-days"></i>{event.date}
                  </div>

                  <div className="time">
                    <i className="fa-regular fa-clock"></i>{event.time}
                    </div>

                  <div className="event-venue">
                  <i className="fa-solid fa-location-dot"></i> {event.venue}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming