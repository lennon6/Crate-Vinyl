const express = require('express');
const router = express.Router();
const Favorite = require('../models/recordModels');
const recordsControllers = require('../controllers/recordsControllers.js');





router.get('/search', recordsControllers.searchRecord, (req, res) => {
    console.log('search query:', req.query.release_title);
    res.status(200).send(res.locals.recordData)
});

router.get('/records/:master_id', recordsControllers.getRecord, (req, res) => {
    res.status(200).send(res.locals.singleRecordData)
})

// router.post('/records/:master_id/reviews', recordsControllers.postReview, (req, res) => {
//     res.status(200).send(res.locals.review)
// })

// router.get('/records/:master_id/reviews', recordsControllers.getReview, (req, res) => {
//     res.status(200).send(res.locals.reviews);
// });


router.get('/favorites', recordsControllers.getFavorite, (req, res) => {
    res.status(200).send(res.locals.favorites)
})

router.post('/favorites/', recordsControllers.saveFavorite, (req, res) => {
    res.status(200).send('success')
})

router.delete('/favorites/', recordsControllers.deleteFavorite, (req, res) => {
    res.status(200).send('success')
})


module.exports = router;


