// Require the .env file with access tokens
require("dotenv").config();

// ---- LINK TO KEYS.JS -----
var keys = require("./keys.js");

// ---- SPOTIFY -----
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// store userInput to determine what function to call
var userInput = process.argv[2];

// npm spotify documentation example


// four commands
// 1. concert-this
    // node liri.js concert-this <artist/band name here>
    function findConcert(){spotify.search({ type: 'artist', query: "childish-gambino" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data.artists.items[0]); 
      });
    }
    //     Name of the venue
    //     Venue location
    //     Date of the Event (use moment to format this as "MM/DD/YYYY")
// 2. spotify-this-song
    //Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
// 3. movie-this
    //node liri.js movie-this '<movie name here>'
// 4. do-what-it-says
    //node liri.js do-what-it-says
    //use the data in random.txt



switch (userInput){
    case "concert-this":
        findConcert();
        break;
    // case "spotify-this-song":
    //     findSong();
    //     break;
}




