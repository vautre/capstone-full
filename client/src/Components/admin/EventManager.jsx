import React, { useState } from 'react';
import { useEvents } from '../../data/EventContext';
import './EventManager.css';

function AddEventForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    presenter: '',
    date: '',
    time: '',
    venue: '',
    status: 'available',
    image: '',
    ticketUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Presenter:</label>
        <input
          type="text"
          name="presenter"
          value={formData.presenter}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Leave empty for random image"
        />
      </div>
      <div className="form-group">
        <label>Ticket URL:</label>
        <input
          type="text"
          name="ticketUrl"
          value={formData.ticketUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal-buttons">
        <button type="submit" className="save-btn">Add Event</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditEventForm({ event, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(event);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Event</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Presenter:</label>
        <input
          type="text"
          name="presenter"
          value={formData.presenter}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
          <option value="cancelled">Cancelled</option>
          <option value="creators">Creators</option>
        </select>
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Leave empty for random image"
        />
      </div>
      <div className="form-group">
        <label>Ticket URL:</label>
        <input
          type="text"
          name="ticketUrl"
          value={formData.ticketUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal-buttons">
        <button type="submit" className="save-btn">Save Changes</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function EventManager() {
  const { events, setEvents } = useEvents();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleEditSubmit = (updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setIsEditModalOpen(false);
  };

  const handleAddSubmit = (newEventData) => {
    const newId = Math.max(...events.map(event => event.id), 0) + 1;
    const newEvent = {
      ...newEventData,
      id: newId,
      image: newEventData.image || 'https://picsum.photos/400/300?random=' + newId
    };
    setEvents(prev => [...prev, newEvent]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="event-manager">
      <div className="event-manager-header">
        <h1>Event Manager</h1>
        <button className="add-event-btn" onClick={() => setIsAddModalOpen(true)}>
          Add New Event
        </button>
      </div>
      
      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Presenter</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td><img src={event.image} alt={event.title} style={{ width: '100px', height: 'auto' }}/></td>
                <td>{event.title}</td>
                <td>{event.presenter}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.venue}</td>
                <td>
                  <span className={`status-badge ${event.status}`}>
                    {event.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <EditEventForm 
              event={selectedEvent}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <AddEventForm 
              onSubmit={handleAddSubmit}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManager;