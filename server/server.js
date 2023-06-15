const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const recordsApi = require('./routes/api.js');
const cors = require('cors');


app.use(bodyParser.json());

app.use(cors());

// handle request for static files
app.use(express.static(path.join(__dirname, 'build')));

// handle parsing ok
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


//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: err.message },
    };
    const errorObj = Object.assign(defaultErr, err);
    const errorStatus = errorObj.status || 500;
    return res.status(errorStatus).send(errorObj.message);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});

module.exports = app;