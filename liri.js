//Lists all the commands 
console.log("-----------------------------------------------------------------------------------")
console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
console.log("-----------------------------------------------------------------------------------")


// All the required npm packages
var dotenv = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

//Keys for Twitter and Spotify 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Recalls user input from the command line
var command = process.argv[2];
var input = process.argv;
var name = "";


//For loop to allow multiple words to be selected
for (var i=3; i<input.length; i++){

    name = name + " " + input[i];

}

//Switch case to operate commands

switch (command) {
    case "my-tweets":
        twitterData();
        break;

    case "spotify-this-song":
        spotifyData();
        break;

    case "movie-this":
        movieData();
        break;
        
    case "do-what-it-says":
        doData();
        break;    

};



//Twitter 

//Lots of random data comes gets logged !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function twitterData() {

        client.get('statuses/user_timeline', function(error, tweets, response) {

    if (!error) {
    console.log(tweets);
    }
});

};

//Spotify 

function spotifyData() {

    spotify.search({ type: "track", query: name ? name : "Lose Yourself" })
                .then((resp) => {
                    let track = resp.tracks.items[0]
                    let music = {
                        artist: track.album.artists[0].name,
                        name: track.name,
                        preview: track.external_urls.spotify,
                        album: track.album.name
                    }
                    console.log(music);
                })
                .catch((err) => {
                    throw err;
                });

};

//Movie

//Add defaut as Mr.Nobody!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// I tried doing this request('http://www.omdbapi.com/?apikey=Trilogy&t='+ name ? name : , function (error, response, body) notice where the name is. But it did not work, while it did in the spotify code. 

function movieData() {
    var request = require('request');
    request('http://www.omdbapi.com/?apikey=Trilogy&t='+ name , function (error, response, body) {

        if (!error && response.statusCode === 200) {

        console.log("\nTitle of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n");
        
        }

    }); 
}

//Do what it says

function doData() {
    fs.readFile('random.txt', { encoding: "utf-8" }, (err, data) => {
        data = data.split(",");
        console.log(data);
        command = data[0];
        name = data[1];

        spotifyData(data[1]);
    });
}
