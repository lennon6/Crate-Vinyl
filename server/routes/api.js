const express = require('express');
const router = express.Router();
const recordsControllers = require('../controllers/recordsControllers.js');
const reviewsControllers = require('../controllers/reviewsControllers.js');
const loginController = require('../controllers/usersControllers.js')

// once the frontend is working, redirect the user to the main page on successful request
router.post('/signup', loginController.createUser, (req, res) => {
    res.status(200).send('success');
})

// once the frontend is working, redirect the user to the main page on successful request
router.get('/login', loginController.verifyUser, (req, res) => {
    res.status(200).send('user verified');
})


router.get('/search', recordsControllers.searchRecord, (req, res) => {
    console.log('search query:', req.query.release_title);
    res.status(200).send(res.locals.recordData);
});

router.get('/records/:master_id', recordsControllers.getRecord, (req, res) => {
    res.status(200).send(res.locals.singleRecordData);
})

router.post('/reviews/:master_id', reviewsControllers.postReview, (req, res) => {
    res.status(200).send('success')
})

router.get('/reviews/:master_id', reviewsControllers.getReviews, (req, res) => {
    res.status(200).send(res.locals.reviews);
});


router.get('/favorites/:user_id', recordsControllers.getFavorites, (req, res) => {
    res.status(200).send(res.locals.favorites);
})

router.post('/favorites/', recordsControllers.saveFavorite, (req, res) => {
    res.status(200).send('success');
})

router.delete('/favorites/:id', recordsControllers.deleteFavorite, (req, res) => {
    res.status(200).send('success');
  });


module.exports = router;


