import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Records from './Records';
import { NavBar } from './NavBar';
import { FavoritesCards } from './FavoritesCards';

export const Favorites = () => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/favorites/1`)
      .then((response) => response.json())
      .then((data) => {
        console.log('favorites data', data);
        setFavorite(data);
      })
      .catch((error) => {
        console.log('Error saving favorite', error);
      });
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="record-cards-div">
        <h2>My favorites</h2>
        <div className="record-cards">
          {Array.isArray(favorite) &&
            favorite.map((record, index) => (
              <FavoritesCards key={index} record={record}/>
            ))}
        </div>
      </div>
    </div>
  );
}
