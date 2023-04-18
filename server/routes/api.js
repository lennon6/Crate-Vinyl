const axios = require('axios');
const express = require('express');
const router = express.Router();

// create api router to pull data from discogs

router.get('/search/:query', (req, res) => {
    axios.get('https://api.discogs.com/database/search', {
      params: {
        q: req.params.query,
        token: 'DkKMJxHxlcAximwbeTLYfvJZKydShQvYWjqsntxS'
      }
    })
    .then(response => {
        res.send(response.body)
        console.log(response)
    })
    .catch(error => {
        res.status(500).send(error);

    })
})

module.exports = router;
