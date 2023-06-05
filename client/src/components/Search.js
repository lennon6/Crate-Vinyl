import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Records from './Records';
import { NavBar } from './NavBar';
import SearchCards from './SearchCards';

const Search = () => {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput !== '') {
      fetch(`http://localhost:3000/search?release_title=${searchInput}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const filteredData = data.results.filter((item, index, arr) => {
            return arr.findIndex((t) => t.master_id === item.master_id) === index;
          });
          setAPIData(filteredData);
          setFilteredResults(filteredData);
        });
    } else if (APIData.length > 0) {
      setFilteredResults(APIData);
    }
  };

  useEffect(() => {
    setFilteredResults(APIData);
  }, [APIData]);

  const handleImageError = (index) => {
    setFilteredResults(filteredResults.filter((item, i) => i !== index));
  };

  return (
    <div className="container">
      <NavBar />
      <div className='search-cards-container'>
      <div className='search-cards-div'>
        <h2>Search For Records</h2>
      <form onSubmit={handleSearch}>
        <input
          value={searchInput}
          className="search-bar"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className='search-button'>Search</button>
      </form>
      </div>
      </div>
      {searchInput.length > 0 && (
        <div className="record-cards">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <SearchCards key={index} record={item} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
