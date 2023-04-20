import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Records from './Records';
import { NavBar } from './NavBar';
import { RecordCards } from './RecordCards';

export const Favorites = () => {

    const [favorite, setFavorite] = useState(null);


    useEffect(() => {
        fetch(`http://localhost:3000/favorites`)
          .then((response) => response.json())
          .then((data) => {
            setFavorite(data)
          })
          .catch((error) => {
            console.log('Error saving favorite', error);
          })
    }, [])


  return (
    <div className="container">
    <NavBar/>
    <div className="record-cards">
    {favorite && favorite.map((record, index) => (
       <RecordCards key={index} record={record}/>
    ))}
     </div>
  </div>
  )
}