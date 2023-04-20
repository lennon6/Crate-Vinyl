import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/styles.css';
import { Ratings } from './Ratings';
import Search from './Search'; 

const SearchCards = ({ record }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      // handle image error
      setImageError(true);
    };
  
    return (
      <div className="record-card">
          <Link to={`/records/${record.master_id}`} className='no-underline'>
          {record.cover_image ? (
            <img className="record-card-img"
              src={record.cover_image}
              onError={handleImageError}
              alt={record.title}
            />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
          <div className="record-info">
            <div className="record-card-title">{record.title}</div>
            <div className='record-card-year'>{record.year}</div>
            <div>{record.genre}</div>
            <Ratings/>
          </div>
          </Link>
      </div>
    );
  
  }


  export default SearchCards


  