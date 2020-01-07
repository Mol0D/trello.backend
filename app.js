const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   next();
});

app.use((error, req, res, next) => {
   const { status = 500, message } = error;

   res.status(status).json({message});
});

mongoose
    .connect(
        'mongodb+srv://Aleks:sPvpg8jlkr79MWz4@cluster0-uaqiq.mongodb.net/trello?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.error(err));
