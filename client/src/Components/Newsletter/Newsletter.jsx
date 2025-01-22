import { useState } from 'react';
import React from 'react';
import './Newsletter.css'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5555/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setStatus({ message: 'Successfully subscribed!', type: 'success' });
            setEmail(''); // Clear the input after successful subscription
          } else {
            setStatus({ message: data.error || 'Failed to subscribe', type: 'error' });
          }
        } catch (error) {
          setStatus({ message: 'Failed to connect to server', type: 'error' });
          console.error('Error:', error);
        }
    }

    return (
        <div className="footer-newsletter">
            <p>Subscribe to our newsletter for the latest events and updates</p>
            <form onSubmit={handleSubscribe}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {status.message && (
                <p className={`subscription-status ${status.type}`}>
                    {status.message}
                </p>
            )}
        </div>
    )
}

export default Newsletter