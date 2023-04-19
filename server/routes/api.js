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


router.get('/favorites', recordsControllers.getFavorite, (req, res) => {
    res.status(200).send(res.locals.favorites)
})

router.post('/favorites/:master_id', recordsControllers.saveFavorite, (req, res) => {
    res.status(200).send(res.locals.favoriteRecord)
})



// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// router.delete('/delete/:id', (req, res) => { 
//     res.send('Delete by ID API')
// })

module.exports = router;


