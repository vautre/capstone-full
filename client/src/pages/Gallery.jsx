import { useState, useEffect } from 'react';
import Pageheader from '../Components/Pageheader/Pageheader'
import Imagemodel from '../Components/Imagemodel/Imagemodel';
import './Gallery.css';
import {albums} from '../data/albums'

const Gallery = () => {
  const [images, setImages] = useState(albums)
  const [filteredImages, setFilteredImages] = useState(images)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const years = ['2024', '2023', '2022', '2021']
  const categories = ['Corporate', 'Wedding', 'Social', 'Conference']

  useEffect(() => {
    let filtered = [...images]
    
    if (searchTerm) {
      filtered = filtered.filter(image => 
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterYear) {
      filtered = filtered.filter(image => image.year === filterYear);
    }
    
    if (filterCategory) {
      filtered = filtered.filter(image => image.category === filterCategory);
    }
    
    setFilteredImages(filtered);
  }, [searchTerm, filterYear, filterCategory, images]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <div className="gallery-page">
      <Pageheader
        title="Our Gallery"
        subtitle="Explore Our Past Events"
        backgroundImage="https://picsum.photos/1920/1080?random=11"
      />
      
      <div className="gallery-content">
        <div className="gallery-filters">
          <input
            type="text"
            placeholder="Search by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="gallery-grid">
          {filteredImages.map((album) => (
            <div
              key={album.id}
              className="gallery-item"
              onClick={() => handleAlbumClick(album)}
            >
              <img 
                src={album.images[0].url} 
                alt={album.title} 
              />
              <div className="image-overlay">
                <h3>{album.title}</h3>
                <p>{album.category} - {album.year}</p>
                <span className="image-count">
                  {album.images.length} photos
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAlbum && (
        <Imagemodel
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
};

export default Gallery; 