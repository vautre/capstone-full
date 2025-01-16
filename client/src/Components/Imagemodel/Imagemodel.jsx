import { useState } from 'react';
import './Imagemodel.css';

const Imagemodel = ({ album, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = album.images[currentImageIndex];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === album.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? album.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-image-container">
          <img src={currentImage.url} alt={`${album.title} - ${currentImage.caption}`} />
          
          <button className="modal-nav prev" onClick={handlePrevious}>&lt;</button>
          <button className="modal-nav next" onClick={handleNext}>&gt;</button>
          
          <div className="modal-counter">
            {currentImageIndex + 1} / {album.images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagemodel; 