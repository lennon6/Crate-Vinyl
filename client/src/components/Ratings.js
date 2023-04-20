import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faStar)

export const Ratings = () => {
  return (
    <div className="ratings-div">
        <FontAwesomeIcon icon={faStar} className="star-div"/>
        <FontAwesomeIcon icon={faStar} className="star-div"/>
        <FontAwesomeIcon icon={faStar} className="star-div"/>
        <FontAwesomeIcon icon={faStar} className="star-div"/>
    </div>

  )
}
