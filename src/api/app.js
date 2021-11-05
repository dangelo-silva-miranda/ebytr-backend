const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

/*
  Material consultado sobre bodyParser.json vs bodyParser.urlencoded
  https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
*/
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Server is online');
});

module.exports = app;
