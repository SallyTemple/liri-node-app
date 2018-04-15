var dotenv = require('dotenv');
require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

function twitterSelection () {
var client = new Twitter(keys.twitter);
var params = {screen_name: 'plum951'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var tweet of tweets) { 
            console.log(tweet.text + '\n');
        }
    }

});
}
function movieThis(movie) {

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ff6074ca";

	request(queryUrl, function(error, response, body) {
		if (!movie){
        var	movie = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};



  function spotifyThis(song) {
      spotify.search({type: 'track', query: song}, function(err, data) {
        if (!err) {
          for (var i = 2; i < data.tracks.items.length; i++) {
            var spotiSelection = data.tracks.items[i];
         
            console.log("Artist: " + spotiSelection.artists[0].name);
            console.log("Song: " + spotiSelection.name);
            console.log("Preview URL: " + spotiSelection.preview_url);
            console.log("Album: " + spotiSelection.album.name);
            console.log("-----------------------");
          }
        } else {
          console.log('Error');
        }
      });
    }

    
  function liribot() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}
		//var selection = data.split(",");
		if (selection[0] === "spotify-this-song") {
			var songslection = selection[1].slice(1, -1);
			spotify(songslection);
		} else if (selection[0] === "my-tweets") {
			var tweeting = selection[1].slice(1, -1);
			twitter(tweeting);
		} else if(selection[0] === "movie-this") {
			var movies = selection[1].slice(1, -1);
			movie(movies);
		} 
		
  	});

};
 if (process.argv[2]=== "my-tweets") {
	twitterSelection();
	
 }
 //var song = "";
 if (process.argv[2]=== "spotify-this-song") {
	 var song = "";
	spotifyThis(song);
	
 }
 if (process.argv[2]=== "movie-this") {
	movieThis(movie);
	
 }
 var selection = process.argv[2];