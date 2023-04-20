import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import '../stylesheets/styles.css';
import { Ratings } from './Ratings';
import { AddToFavorites } from './AddToFavorites';
import Reviews from './Reviews';





const Records = ({ match }) => {
  const [record, setRecord] = useState(null);
  const { params: { master_id } } = match;

  useEffect(() => {
    fetch(`http://localhost:3000/records/${master_id}`)
    .then((response) => response.json())
    .then((data) => {
        setRecord(data)
    })
    .catch((error) => {
        console.log('Error', error);
    });
  }, [master_id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  const data = record[0];



const trackList = record.tracklist.map(song => (
    <div className='tracklist-div-row' key={song.title}>
        <div className="tracklist-div-left">
        <p>{song.title}</p>
        </div>
        <div className='tracklist-div-right'>
        <p>{song.duration}</p>
        </div>
    </div>
));

const genre = record.genres[0];

  return (
    <div className='container'>
      <NavBar />
      <div className='record-div'>
          <div className='record-div-left'>
            <img className="record-main-img" src={record.images[0].uri} />
            <Ratings />
            <div className='tracklist-div'>
            <p id='tracklist-header'>Tracklist</p>
            <div className='tracklist-line'></div>
                {trackList}
            </div>
          </div>  
        <div className='record-div-right'>
          <h1>{record.title}</h1>
          <p>{record.artists[0].name}</p>
          <p>{record.year}</p>
          <p>{genre}</p>
          <AddToFavorites record={record}/>
          <Reviews/>
        </div>
       </div>
      </div>
  );
};

export default Records