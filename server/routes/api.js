const express = require('express');
const router = express.Router();
const Record = require('../models/recordModels');
const recordsControllers = require('../controllers/recordsControllers.js');





router.get('/records', recordsControllers.getRecord, (req, res) => {
    res.status(200).send(res.locals.recordData)
});

router.post('/records/:id', recordsControllers.getRecord, recordsControllers.createRecord, (req, res) => {
    res.statusCode(200).json({})
})



router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

router.delete('/delete/:id', (req, res) => { 
    res.send('Delete by ID API')
})

module.exports = router;


