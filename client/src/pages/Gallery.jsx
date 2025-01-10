import React from 'react';
import './Gallery.css'; // Create a CSS file for styling
import cny1 from '../assets/cny1.jpg'
import cny2 from '../assets/cny2.jpg'
import davpar from '../assets/davpar.jpg'
import law from '../assets/law.jpg'
import dtf from '../assets/dtf.jpg'
import arlo from '../assets/arlo.jpg'
import kaizen from '../assets/kaizen.jpg'
import fushimi from '../assets/fushimi.jpg'


const photos = [
  { id: 1, src: cny1, alt: 'Image 1' },
  { id: 2, src: cny2, alt: 'Image 2' },
  { id: 3, src: davpar, alt: 'Image 3' },
  { id: 4, src: law, alt: 'Image 4' },
  
  { id: 5, src: dtf, alt: 'Image 5' },
  { id: 6, src: arlo, alt: 'Image 6' },
  { id: 7, src: kaizen, alt: 'Image 7' },
  { id: 8, src: fushimi, alt: 'Image 8' },
];

const Gallery = () => {
  return (
    <div>
      <div className="gallery-text">
        <h1>Past Events</h1> 
        <p>Our Gallery</p>
      </div>
      <main className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </main>
      <footer className="gallery-footer">
        <p>Powered by DPG | Copyright © 2025</p>
        <div className="social-icons">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Tumblr</a>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
