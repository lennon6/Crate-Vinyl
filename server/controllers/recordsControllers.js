// const { model } = require('mongoose');
const models = require('../models/recordModels');
const axios = require('axios');
const { Favorite } = require('../models/recordModels');
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

    const { master_id, artist, release_title, image_URL } = req.body;
    console.log('Req body', req.body)
    const favorite = new Favorite({master_id, artist, release_title, image_URL});
      favorite.save()
      .then(result => {
        res.locals.favoriteRecord = result;
        return next();
      })
      .catch(error => {
        return next({
            log: 'Error saving record info',
            message: { error },
            status: 400,
      });
    });
  };
  
  recordsControllers.deleteFavorite = (req, res, next) => {
    const { master_id } = req.body;
    models.Favorite.findOneAndDelete({master_id})
      .then(() => {
        console.log('Successful deletion');
        return next();
      })
      .catch(err => {
        console.log('error deleting favorite', err);
       return next(err);
      });
};


  recordsControllers.getFavorite = (req, res, next) => {
    models.Favorite.find({})
    .then(data => {
        res.locals.favorites = data;
        return next();
    })
  };
  
  


module.exports = recordsControllers;


