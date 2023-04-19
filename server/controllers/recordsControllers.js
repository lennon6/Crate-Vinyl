const { model } = require('mongoose');
const Records = require('../models/recordModels');
const axios = require('axios');

const recordsControllers  = {};

recordsControllers.getRecord = (req, res, next) => {
    const { artist_id, genre, artist, release_title, year, track } = req.query;
    axios.get('https://api.discogs.com/database/search', {
        params: {
          q: release_title,
          token: 'DkKMJxHxlcAximwbeTLYfvJZKydShQvYWjqsntxS'
        }
      })
      .then(response => {
      console.log(response.data)
        res.locals.recordData = response.data
        return next();
    })
      .catch(error => {
          res.status(500).send(error);
      })
  }


  recordsControllers.createRecord = (req, res, next) => {
    const { artist_id, genre, artist, release_title, year, track } = req.query;
    const newRecord = new Records({artist_id, genre, artist, release_title, year, track});
    newRecord.save()
      .then(record => {
        res.status(201).json(record);
      })
      .catch(error => {
        res.status(500).send('Server error')
      });
  };
  
  


module.exports = recordsControllers;


