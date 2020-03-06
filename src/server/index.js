const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const aylien = require("aylien_textapi");

/*
*
  Initialisation
*
*/

// Load environment variables
dotenv.config({path:__dirname+'/../../.env'});

// Create express server
const app = express()

// Point server to site folder
app.use(express.static('dist'))

// Use middleware and dependencies
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

console.log("ID is: " + process.env.API_ID);
console.log("Key is: " + process.env.API_KEY);

// Start server
app.listen(8081, function () {
  console.log('Server listening on port 8081')
})


// API_ID="2e2222e3";
// API_KEY="0406bba6fce9f93946aeb4eca5b9e454";

// Set aylien API credentials
var textapi = new aylien({
  application_id: "2e2222e3",
  application_key: "0406bba6fce9f93946aeb4eca5b9e454"
});

/*
*
  Routes
*
*/

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/url', function (req, res) {
  console.log(req.query.url);
  const urlToAnalyse = req.query.url;
  // textapi.sentiment({
  //   'url': urlToAnalyse
  // }, function(error, response) {
  //   if (error === null) {
  //     console.log(response);
  //     res.send(response);
  //   } else {
  //     console.log(error);
  //   }
  // });
  // Example response for testing
  res.send({ 
    polarity: 'neutral',
    subjectivity: 'subjective',
    text: 'Hello',
    polarity_confidence: 0.6483058333396912,
    subjectivity_confidence: 1 
  })
})