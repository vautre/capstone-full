import { useState, useEffect } from 'react';
import Pageheader from '../Components/Pageheader/Pageheader'
import Imagemodel from '../Components/Imagemodel/Imagemodel';
import './Gallery.css';

import cny from '../assets/cny.jpg';
import cny2 from '../assets/cny2.jpg';
import davpar from '../assets/davpar.jpg';
import law from '../assets/law.jpg';
import dtf from '../assets/dtf.jpg';
import arlo from '../assets/arlo.jpg';
import kaizen from '../assets/kaizen.jpg';
import fushimi from '../assets/fushimi.jpg';

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: 'Lunar Gala 2024',
      category: 'Gala',
      year: '2024',
      tags: ['Gala', 'Celebration', 'New Years'],
      images: [
        {
          id: '1-1',
          url: cny,
          caption: 'Lunar Gala 2024'
        },
        {
          id: '1-2',
          url: cny2,
        },
        {
          id: '1-3',
          url: 'https://picsum.photos/800/600?random=3',
        }
      ]
    },
    {
      id: 2,
      title: 'DParTai 2023',
      category: 'Birthday',
      year: '2023',
      tags: ['Birthday', 'Gala', 'celebration'],
      images: [
        {
          id: '2-1',
          url: davpar,
          caption: 'Birthday'
        },
        {
          id: '2-2',
          url: 'https://picsum.photos/800/600?random=5',
          caption: 'First Dance'
        },
        {
          id: '2-3',
          url: 'https://picsum.photos/800/600?random=6',
          caption: 'Reception'
        }
      ]
    },
    {
      id: 3,
      title: 'Tech Conference',
      category: 'Conference',
      year: '2024',
      tags: ['technology', 'innovation', 'speakers'],
      images: [
        {
          id: '3-1',
          url: 'https://picsum.photos/800/600?random=7',
          caption: 'Main Stage'
        },
        {
          id: '3-2',
          url: 'https://picsum.photos/800/600?random=8',
          caption: 'Workshop Session'
        },
        {
          id: '3-3',
          url: 'https://picsum.photos/800/600?random=9',
          caption: 'Panel Discussion'
        }
      ]
    }
  ]);

  const [filteredImages, setFilteredImages] = useState(images);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const years = ['2024', '2023', '2022', '2021'];
  const categories = ['Corporate', 'Wedding', 'Social', 'Conference'];

  useEffect(() => {
    let filtered = [...images];
    
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