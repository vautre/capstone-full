import React, { useState } from 'react';
import './Gallery.css'; // Create a CSS file for styling
import cny from '../assets/cny.jpg';
import cny2 from '../assets/cny2.jpg';
import davpar from '../assets/davpar.jpg';
import law from '../assets/law.jpg';
import dtf from '../assets/dtf.jpg';
import arlo from '../assets/arlo.jpg';
import kaizen from '../assets/kaizen.jpg';
import fushimi from '../assets/fushimi.jpg';

const photos = [
  { id: 1, src: cny, alt: 'Image 1' },
  { id: 2, src: cny2, alt: 'Image 2' },
  { id: 3, src: davpar, alt: 'Image 3' },
  { id: 4, src: law, alt: 'Image 4' },
  { id: 5, src: dtf, alt: 'Image 5' },
  { id: 6, src: arlo, alt: 'Image 6' },
  { id: 7, src: kaizen, alt: 'Image 7' },
  { id: 8, src: fushimi, alt: 'Image 8' },
];

const Gallery = () => {
  const [clickedImage, setClickedImage] = useState(null);

  const handleImageClick = (src) => {
    setClickedImage(src);
  };

  const handleCloseClick = () => {
    setClickedImage(null);
  };

  return (
    <div className='gallery-container'>
      <div className="gallery-text">
        <h1>Past Events</h1>
        <p>Our Gallery</p>
      </div>
      <main className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img 
              src={photo.src} 
              alt={photo.alt} 
              onClick={() => handleImageClick(photo.src)} 
            />
          </div>
        ))}
      </main>

      {/* Modal for Enlarged Image */}
      {clickedImage && (
        <div className="overlay" onClick={handleCloseClick}>
          <div className="enlarged-image">
            <img src={clickedImage} alt="Enlarged" />
          </div>
        </div>
      )}

      <footer className="gallery-footer">
        <p>Powered by Joyce | Capstone Project</p>
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
