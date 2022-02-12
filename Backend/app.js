require("dotenv").config();
const express = require("express");
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require('cors');
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://localhost:3000");
//   next();
// });

app.use(cors(corsOptions));

//Static folder access
app.use(express.static('public'));


// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

//Connect the mongoDB database
const connectDB = require('./config/db');
connectDB();


//Set the template and json response
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Route Handler
const files = require("./routes/files");
const show = require("./routes/show");
const download = require("./routes/download");

app.use('/api/files', files);
app.use('/files', show);
app.use('/files/download', download);

app.listen(PORT, console.log(`Listening on port ${PORT}.`))














// require('dotenv').config();
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const path = require('path');
// const cors = require('cors');
// // Cors 
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(',')
//   // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
// }

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

// app.use(cors(corsOptions))
// app.use(express.static('public'));

// const connectDB = require('./config/db');
// connectDB();

// app.use(express.json());

// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');

// // Routes 
// app.use('/api/files', require('./routes/files'));
// app.use('/files', require('./routes/show'));
// app.use('/files/download', require('./routes/download'));


// app.listen(PORT, console.log(`Listening on port ${PORT}.`))