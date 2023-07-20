import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from './NavBar';
import newReleases from './newReleases.json';
import popularRecords from './popularRecords.json'
import { RecordCards } from './RecordCards';


const Home = () => {

    return (
        <div className="container">
            <NavBar />
            <div className='record-cards-div'>
              <h2 className="text-blue text-4xl">Popular Records</h2>
            <div className="record-cards">
               {popularRecords.results.map((record, index) => (
                <RecordCards key={index} record={record}/>
               ))}
           </div>
         </div>
         <div className='record-cards-div'>
              <h2>New Releases</h2>
            <div className="record-cards">
               {newReleases.results.map((record, index) => (
                <RecordCards key={index} record={record}/>
               ))}
           </div>
         </div>
      </div>
    )
}

export default Home




