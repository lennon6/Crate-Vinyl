
const axios = require('axios');
const db = require('../models/poolsModels');
const recordsControllers  = {};


// middleware for searching record through discogs API

recordsControllers.searchRecord = (req, res, next) => {
    const { release_title } = req.query;
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

  // middleware for getting an individual record

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

  // middleware for getting user's favorite records

  recordsControllers.getFavorites = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const sqlGetQuery = `SELECT * FROM favorites WHERE user_id = ${user_id}`;
      const result = await db.query(sqlGetQuery);
      res.locals.favorites = result.rows[0];
      return next();
    } catch(err) {
      return next({
        log: 'error',
        message: { err: 'Error in getting favorites'}
      });
    }
  }
  
  // middleware for saving a record

  recordsControllers.saveFavorite = async (req, res, next) => {
    try {
      const { master_id, artist, release_title, image_url, user_id } = req.body;
      const sqlAddQuery = `INSERT INTO favorites(master_id, artist, release_title, image_url, user_id) VALUES ('${master_id}', '${artist}', '${release_title}', '${image_url}', '${user_id}')`;
      const result = await db.query(sqlAddQuery);
      console.log('result', result.rows[0]);
      res.locals.favoriteRecord = result.rows[0]
      return next();
    } catch(err) {
        return next({
          log: 'error',
          message: { err: 'Error in saving favorite'}
        });
     }
  }
  
  // middleware for deleting a favorite 

  recordsControllers.deleteFavorite = async (req, res, next) => {
    try {
      const { _id } = req.body;
      const sqlDeleteQuery = `DELETE FROM favorites WHERE _id = ${_id}`;
      const result = await db.query(sqlDeleteQuery);
      return next();
    } catch(err) {
      return next({
        log: 'error',
        message: { err: 'Error in deleting favorite'}
      });
    }
  
};


  
//   recordsControllers.postReview = (req, res, next) => {
//     // console.log('req body', req.body)
//     const { master_id, comment } = req.body;
//     const review = new Review({master_id, comment});
//       review.save()
//       .then(result => {
//         res.locals.review = result;
//         return next();
//       })
//       .catch(error => {
//         return next({
//             log: 'Error saving review',
//             message: { error },
//             status: 400,
//         })
//       })
//   }
  

//   recordsControllers.getReview = (req, res, next) => {
//     const { master_id } = req.params;
//     models.Review.find({master_id: master_id})
//       .then(reviews => {
//         res.locals.review = reviews;
//         return next();
//       })
//         .catch(error => {
//             return next({
//                 log: 'Error retrieving review',
//                 message: { error },
//                 status: 400,
//             })
//           })
//       }


module.exports = recordsControllers;


