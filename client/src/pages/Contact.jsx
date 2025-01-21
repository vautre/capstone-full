import React, { useState } from 'react'
import Pageheader from '../Components/Pageheader/Pageheader';
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    console.log(formData);
  };

  return (
    <div className="contact-page">
    <Pageheader
      title="Contact Us"
      subtitle="We're here to help"
      backgroundImage="https://picsum.photos/1920/1080?random=12"
    />
    
    <div className="contact-container">
      <div className="sidebar-links">
          <ul>
            <li><a href="/contact-us">CONTACT US</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">TERMS & CONDITIONS</a></li>
          </ul>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <p>Have questions? We're here to help.</p>
          <p>We want to make this experience as easy as possible so you can focus on the important job of being a parent.</p>
          <p>For any product-related questions, including questions regarding your order, send us an email at <a href="mailto:nygcpr@gmail.com">nygcpr@gmail.com</a></p>
          <p>We usually respond the same business day. In the meantime, check out our FAQs for more information.</p>
          <p>You can also email us using the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>FIRST NAME</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
              />
            </div>
            <div className="form-group">
              <label>LAST NAME</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
              />
            </div>
            <div className="form-group">
              <label>PHONE NUMBER</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>SUBJECT</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select Inquiry</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Service</option>
                <option value="collab">Collaborations</option>
                <option value="sponsor">Sponsorships</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>MESSAGE</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="6"
            />
          </div>

          <button type="submit" className="submit-button">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  </div>
);
};


export default Contact