// Require the .env file with access tokens
require("dotenv").config();


// ---- KEYS -----
var keys = require("./keys.js");

// ---- SPOTIFY -----
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// npm spotify documentation example
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(data); 
  });

  