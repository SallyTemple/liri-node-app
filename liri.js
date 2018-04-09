//Get data
require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
});


var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


//log text
var filename = '/log.txt';
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

//Arguments
var num1 = process.argv[2];
var num2 = process.argv[3];


//Switch Actions
function switching(num1, num2) {
      switch (num1) {
            case "my-tweets":
                  getTweets();
                  break;

            case "spotify-this-song":
                  getSpotify(num2);
                  break;

            case "movie-this":
                  getOMDB(num2);
                  break;

            case "do-what-it-says":
                  getWhatItSays();
                  break;

            default:
                  console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
                  break;
      }
}

//Twitter
function myTweets() {

      var params = { screen_name: 'plum951' };
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                  for (var i = 0; i < tweets.length; i++) {

                        var date = tweets[i].created_at;
                        console.log("@Plum951: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                        console.log("----------");
                        fs.appendFile('log.txt', "@Plum951: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                        fs.appendFile('log.txt', "----------");
                  }
            } else {
                 return console.log('Error');
            }
      });
}
