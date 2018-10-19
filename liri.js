// Require the .env file with access tokens
require("dotenv").config();

// ---- REQUEST -----
var request = require('request');

// ---- LINK TO KEYS.JS -----
var keys = require("./keys.js");

// ---- MOMENT ----
var moment = require("moment")

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

// global variable date for concert-this command
var date;

// Initial run
chooseCommand();

function chooseCommand(){
    switch (command){
        case "concert-this":
            findConcert();
            break;
        case "spotify-this-song":
            findSong();
            break;
        case "movie-this":
            findMovie();
        case "do-what-it-says":
            // read random.txt to determine which command to execute
            fs.readFile('random.txt','utf8',function(error,data){
                if (error){
                    return console.log(error)
                }
                // store data from random.txt in array
                var dataArray = data.split(',')
                // set 0th index = command name
                command = dataArray[0]
                // set 1st index = input
                input = dataArray[1]
                // execute chooseCommand
                chooseCommand()            
            })
    }
}    

// 1. concert-this
    // node liri.js concert-this <artist/band name here>
function findConcert(){
    var bandsqueryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    request(bandsqueryURL, function(error, response, body){
        //if error occurs
        console.log("Error: " + error);
        // if no error and statuscode = 200
        if (!error && response.statusCode === 200){
            var eventsObj = JSON.parse(body)
                for (var i in eventsObj){
                    console.log("Venue name: " + eventsObj[i].venue.name);
                    // Venue location
                    console.log("Venue location: " + eventsObj[i].venue.city + ", " + eventsObj[i].venue.region + eventsObj[i].venue.country)
                    // Date of the Event (use moment to format this as "MM/DD/YYYY")
                    console.log("Date: " + moment(eventsObj[i].datetime.split('T')[0], 'YYY-MM-DD').format("MM/DD/YY"))
                }
        }
    })
}
// 2. spotify-this-song
function findSong(){spotify.search({type: 'track', query: input, limit: 1}, function(err, data) {
    if (err) {
      input = "The Sign"
      findSong();
    }
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
function findMovie(){request("http://www.omdbapi.com/?t="+ input+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
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

