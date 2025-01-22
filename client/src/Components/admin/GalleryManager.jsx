import React, { useState } from 'react';
import { albums } from '../../data/albums';
import AlbumModal from './AlbumModal';
import './GalleryManager.css';

function GalleryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleEdit = (albumId) => {
    const albumToEdit = albums.find(album => album.id === albumId);
    setSelectedAlbum(albumToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      console.log('Delete album:', albumId);
    }
  };

  const handleAddNew = () => {
    setSelectedAlbum(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (selectedAlbum) {
      console.log('Update album:', formData);

    } else {
      console.log('Create new album:', formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="gallery-manager">
      <div className="gallery-header">
        <h1>Gallery Manager</h1>
        <button className="add-album-btn" onClick={handleAddNew}>
          <i className="fa-solid fa-plus"></i>Add New Album</button>
      </div>
      <div className="albums-grid">
        {albums.map((album) => (
          <div key={`${album.id}-${album.title}`} className="album-card">
            <div className="album-actions">
              <button 
                className="action-btn edit-btn"
                onClick={() => handleEdit(album.id)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => handleDelete(album.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <div className="album-thumbnails">
              {album.images.slice(0, 3).map((image) => (
                <div key={image.id} className="thumbnail">
                  <img src={image.url} alt={`${album.title} - ${image.id}`} />
                </div>
              ))}
            </div>
            <div className="album-info">
              <h2>{album.title}</h2>
              <div className="album-details">
                <p><strong>Year:</strong> {album.year}</p>
                <p><strong>Category:</strong> {album.category}</p>
                <p><strong>Images:</strong> {album.images.length}</p>
                <div className="tags">
                  {album.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        albumData={selectedAlbum}
      />
    </div>
  );
}

export default GalleryManager;