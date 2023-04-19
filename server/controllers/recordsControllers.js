// const { model } = require('mongoose');
const models = require('../models/recordModels');
const axios = require('axios');

const recordsControllers  = {};

recordsControllers.searchRecord = (req, res, next) => {
    const { artist_id, genre, artist, release_title, year, track } = req.query;
    axios.get('https://api.discogs.com/database/search', {
        params: {
          q: release_title,
          token: 'DkKMJxHxlcAximwbeTLYfvJZKydShQvYWjqsntxS'
        }
      })
      .then(response => {
        res.locals.recordData = response.data
        return next();
    })
      .catch(error => {
          res.status(500).send(error);
      })
  }

  recordsControllers.getRecord = (req, res, next) => {
    const { master_id } = req.params;
    axios.get(`https://api.discogs.com/masters/${master_id}`, {
        params: {
          token: 'DkKMJxHxlcAximwbeTLYfvJZKydShQvYWjqsntxS'
        }
      })
      .then(response => {
        res.locals.singleRecordData = response.data;
        return next();
    })
      .catch(error => {
          return next({
            log: 'Error retrieving record info',
            message: { error },
            status: 400,
          });
      });
  };


  recordsControllers.saveFavorite = (req, res, next) => {
    const favoritesList = [];
    const { master_id, genre, artist, release_title, year, track } = req.body;
    console.log(req.body)
    const favorite = new Favorite({master_id, genre, artist, release_title, year, track});
      favorite.save()
      .then(result => {
        favoritesList.push(result)
        next();
      })
      .catch(error => {
        return next({
            log: 'Error saving record info',
            message: { error },
            status: 400,
      });
    });
  };
  

  recordsControllers.getFavorite = (req, res, next) => {
    models.Favorite.find({})
    .then(data => {
        console.log(data);
        res.locals.favorites = data;
        return next();
    })
  };
  
  


module.exports = recordsControllers;


