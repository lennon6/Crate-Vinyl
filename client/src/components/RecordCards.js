import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/styles.css';
import { Ratings } from './Ratings';
import { AddToFavorites } from './AddToFavorites';
import Reviews from './Reviews';


export const RecordCards = ({record }) => {
  return (
    <div className='record-card'>
    <Link to={`/records/${record.master_id}`} className='no-underline'>
        <img className='record-card-img' src={record.image_URL}/>
        <div className='record-info'>
        <div className='record-card-title'>{record.release_title}</div>
        <div>{record.artist}</div>
        <Ratings/>
        </div>
    </Link>
    </div>

  )
}


