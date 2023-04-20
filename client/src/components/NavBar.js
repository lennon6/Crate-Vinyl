import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../stylesheets/styles.css'

export const NavBar = () => {
  return (
    <div className="nav-bar">
    <Link to={'/'} className='no-underline'>
      <h1>Crate&Vinyl</h1>
    </Link>
      <div className="nav-bar-right">
        <div className='favorites-nav'>
          <Link to={'/favorites'} className='no-underline'>
          <h2>My favorites</h2>
          </Link>
        </div>
        <div className='search-nav'>
        <Link to={'/search'} className='no-underline'>
          <h2>Search</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}
