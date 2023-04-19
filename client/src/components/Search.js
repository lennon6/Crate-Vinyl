import React, { useState, useEffect } from 'react';

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
      console.log('APIData:', data.records);
      setAPIData(data.records);
      setFilteredResults(data.records);
    })
  }, [searchInput]);

  console.log('APIData', APIData);
  console.log('filteredResults:', filteredResults);


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
        setFilteredResults(data.records)
      })
    } else {
      setFilteredResults(APIData)
    }
  }

console.log('filteredResults', filteredResults)

return (
  <div>
    <input value={searchInput} onChange={(e) => searchRecords(e.target.value)} />
    {filteredResults && (
      <ul>
        {filteredResults.map((item, index) => (
          <li key={index}>{item.release_title}</li>
        ))}
      </ul>
    )}
  </div>
);


}





export default Search