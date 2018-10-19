// Require the .env file with access tokens
require("dotenv").config();

// ---- REQUEST -----
var request = require('request');

// ---- LINK TO KEYS.JS -----
var keys = require("./keys.js");

// ---- MOMENT ----
var moment = require("moment")

// --- LINK TO INQUIRER ---
var inquirer = require('inquirer');

// --- LINK TO BANDS IN TOWN ---
var bandsintown = require('bandsintown')('codingbootcamp');

// ---- SPOTIFY -----
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// ---- OMDB -----
var omdb = require('omdb');

// ---- REQUIRE ---
var fs = require("fs");


// store userInput to determine what function to call
var command = process.argv[2];
var input = process.argv.splice(3).join(" ");

// convert date to correct format for bandsintown using moment.js
var date;

// Initial run
cmdSelect();

function cmdSelect(){
    switch (command){
        case "concert-this":
            findConcert();
            break;
        case "spotify-this-song":
            findSong();
            break;
        case "movie-this":
            findMovie();
        // 4. do-what-it-says
        case "do-what-it-says":
            fs.readFile('random.txt','utf8',function(error,data){
                if (error){
                    return console.log(error)
                }
                var dataArray = data.split(',')
                command = dataArray[0]
                input = dataArray[1]
                cmdSwitch()            
            })
    }
}    

// 1. concert-this
    // node liri.js concert-this <artist/band name here>
function findConcert(){
    bandsintown.getArtistEventList(input, date).then(function(events) {
        var events = events[0]
        console.log("Venue name: " + events.venue.name);
        // Venue location
        console.log("Venue location: " + events.venue.city + ", " + events.venue.region + events.venue.country)
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        console.log("Date: " + moment(events.datetime.split('T')[0], 'YYY-MM-DD').format("MM/DD/YY"))
        // console.log(events[0])
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
function findMovie(){request("http://www.omdbapi.com/?t="+ userInput+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            //    * Title of the movie.
            console.log('Title: ' + JSON.parse(body).Title)
            //    * Year the movie came out.
            console.log('Year: ' + JSON.parse(body).Year)
            //    * IMDB Rating of the movie.
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            //    * Rotten Tomatoes Rating of the movie.
            console.log("The movie's RottenTomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            //    * Country where the movie was produced.
            console.log("Movie was produced in: " + JSON.parse(body).Country);
            //    * Language of the movie.
            console.log("Language: " + JSON.parse(body).Language);
            //    * Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot);
            //    * Actors in the movie
            console.log("Actors: " + JSON.parse(body).Actors);
        }
      });

    }

    


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






