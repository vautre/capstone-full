import React, { useState, useEffect } from 'react';
import './AlbumModal.css';

function AlbumModal({ isOpen, onClose, onSubmit, albumData }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    year: '',
    tags: '',
    images: []
  });

  useEffect(() => {
    if (albumData) {
      setFormData({
        ...albumData,
        tags: albumData.tags.join(', ')
      });
    }
  }, [albumData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    onSubmit(processedData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{albumData ? 'Edit Album' : 'Add New Album'}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Gala, Celebration, Event"
            />
          </div>
          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files);
              }}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {albumData ? 'Save Changes' : 'Create Album'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlbumModal; 