import React, { useState, useEffect } from 'react';

export const AddToFavorites = ({ record }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await fetch(`http://localhost:3000/favorites/${record.id}`);
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error('Failed to fetch favorite', error);
      }
    };
    fetchFavorite();
  }, [record.id]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await fetch(`http://localhost:3000/favorites/${record.id}`, {
          method: 'DELETE',
        });
        setIsFavorite(false);
        localStorage.setItem(`favorite_${record.id}`, 'false'); // Save favorite status to localStorage
        console.log('Favorite removed successfully');
      } else {
        await fetch('http://localhost:3000/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            master_id: record.id,
            artist: record.artists[0].name,
            release_title: record.title,
            image_URL: record.images[0].uri,
          }),
        });
        setIsFavorite(true);
        localStorage.setItem(`favorite_${record.id}`, 'true'); // Save favorite status to localStorage
        console.log('Favorite added successfully');
      }
    } catch (error) {
      console.error('Failed to update favorite', error);
    }
  };

  // Load favorite status from localStorage on component mount
  useEffect(() => {
    const favoriteStatus = localStorage.getItem(`favorite_${record.id}`);
    if (favoriteStatus !== null) {
      setIsFavorite(favoriteStatus === 'true');
    }
  }, [record.id]);

  return (
    <div>
      <button type="button" className="favorites-button" onClick={handleFavoriteClick}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
};
