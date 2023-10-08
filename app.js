require('dotenv').config();
const cors = require('cors');
const express = require('express');

const router = require('./router/router')

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/uploads', express.static('uploads'));

app.use('/', router);

app.listen(
    process.env.PORT, 
    () => console.log('listening on port ' + process.env.PORT)
);