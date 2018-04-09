require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter); 
var fs = require('fs');
var filename = '/log.txt';
var log = require('simple-node-logger').createSimpleFileLogger( filename );
log.setLevel('all');