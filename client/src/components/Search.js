import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Records from './Records';
import { NavBar } from './NavBar';
import { RecordCards } from './RecordCards';

const Search = () => {

  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [ searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/search?release_title=${searchInput}`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setAPIData(data.results);
      setFilteredResults(data.results);
    })
  }, [searchInput]);


  const searchRecords = (searchValue) => {
    console.log('search value:', searchValue);
    setSearchInput(searchValue);
    if (searchValue !== '') {
      fetch(`http://localhost:3000/search?release_title=${searchValue}`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setFilteredResults(data.results)
      })
    } else {
      setFilteredResults(APIData)
    }
  }

  const handleImageError = (index) => {
    setFilteredResults(filteredResults.filter((item, i) => i !== index));
  }
  
console.log('filteredResults', filteredResults)

return (
  <div className="container">
    <NavBar/>
    <input value={searchInput} onChange={(e) => searchRecords(e.target.value)} />
    {searchInput.length > 0 && (
      filteredResults.length > 0 ? (
        <ul>
          {filteredResults.map((item, index) => (
            <li key={index}>
              <RecordCards/>
              <Link to={`/records/${item.master_id}`}>{item.title}
                <div>{item.title}</div>
                {item.cover_image ?
                  <img src={item.cover_image} onError={() => handleImageError(index)} alt={item.title} /> :
                  null
                }
                <div>{item.year}</div>
                <div>{item.genre}</div>
                </Link>
              </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )
    )}
  </div>
);
}







export default Search