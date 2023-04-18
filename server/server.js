const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const apiRouter = require('./routes/api');

// const homePage = path.resolve(__dirname, '../client/public/index.html');

// handle request for static files
app.use(express.static(path.join(__dirname, 'build')));


//define router handlers

// tests

app.get('/', apiRouter, (req, res) => {
    res.status(200).send(response);
    console.log(response)
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong')
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'EXPRESS BACKEND IS NOW CONNECTED'})
});

// app.get('/', (req,res) => {
//     res.sendFile(homePage)
// })


// Start Server

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});

module.exports = app;