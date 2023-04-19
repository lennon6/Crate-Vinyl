const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const recordsApi = require('./routes/api.js');
const recordsControllers = require('./controllers/recordsControllers')


// handle request for static files
app.use(express.static(path.join(__dirname, 'build')));

// handle parsing
app.use(express.json());

//define router handlers
app.use('/', recordsApi);

// tests
app.get('/express_backend', (req, res) => {
    res.send({ express: 'EXPRESS BACKEND IS NOW CONNECTED'})
});

// serve index
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})




// Start Server
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});

module.exports = app;