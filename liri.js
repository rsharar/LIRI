// Require the .env file with access tokens
require("dotenv").config();

// ---- LINK TO KEYS.JS -----
var keys = require("./keys.js");

// --- LINK TO INQUIRER ---
var inquirer = require('inquirer');

// --- LINK TO BANDS IN TOWN ---
var bandsintown = require('bandsintown')('codingbootcamp');
// ---- SPOTIFY -----
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// store userInput to determine what function to call
var userFunction = process.argv[2];
var userInput = process.argv[3];

// convert date to correct format for bandsintown using moment.js
var date;
// npm spotify documentation example


// four commands
// 1. concert-this
    // node liri.js concert-this <artist/band name here>
function findConcert(){
    bandsintown.getArtistEventList(userInput, date).then(function(events) {
    // if (err) {
    //     console.log("No events for this artist.")
    // }else{
      // return array of events
        // Name of the venue
        console.log("Venue name: " + events[0].venue.name);
        // Venue location
        console.log("Venue location: " + events[10].venue.city + ", " + events[0].venue.region)
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        console.log(events[0])
    });
}
// 2. spotify-this-song
function findSong(){spotify.search({type: 'track', query: userInput, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // else if (userInput = ""){
    //     // If no song is provided then your program will default to "The Sign" by Ace of Base.
    //     console.log("The Sign by Ace of Base")
    // }
    else {
        // Artist(s)
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        // The song's name
        console.log("Song name: " + data.tracks.items[0].name)
        // A preview link of the song from Spotify
        console.log("Link to song preview on Spotify: " + data.tracks.items[0].external_urls.spotify)
        // The album that the song is from
        console.log("Album: " + data.tracks.items[0].album.name);
    }
  });
}
// 3. movie-this
    //node liri.js movie-this '<movie name here>'
// 4. do-what-it-says
    //node liri.js do-what-it-says
    //use the data in random.txt

// inquirer.prompt([
//     {
//         type: 'list',
//         message: 'Choose your version.',
//         name: 'userInput',
//         choices: ['concert-this','spotify-this-song','movie-this','do-what-it-says']
//     }
// ]).then(function(res){
//     if (res.userInput == 'concert-this'){
        
//     }
//     else if (res.userInput == 'spotify-this-song'){
        
//     }
//     else if (res.userInput == 'movie-this'){
        
//     } 
//     else if (res.userInput == 'do-what-it-says'){

//     }
// })


switch (userFunction){
    case "concert-this":
        findConcert();
        break;
    case "spotify-this-song":
        findSong();
        break;
}




