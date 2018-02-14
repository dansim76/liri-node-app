require("dotenv").config();
var keys = require('./key.js');
var omdb = require('omdb');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs = require("fs");
var request = require("request");

var spotify = new Spotify(keys.spotify_creds);
  


switch (process.argv[2]){

case "my-tweets":
	mytweets();

	break;

case "spotify-this-song":
	spotifythis();
	
	break;
case "movie-this":
	moviethis();

	break;

case "do-what-it-says":
	dowhatitssay();

	break;


};
////////Declaring function
////tweet function
function mytweets(){
	var client = new Twitter(keys.twitter);
	var params = {screen_name: 'ChicagoBulls670', count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
  }
});
////spotify function
};
function spotifythis(song){
	var songName = process.argv[3];
    var song;

   debugger
    	if (songName === undefined){
    		song="THe Sign"

    	}
    	else{
debugger;
    		song = songName;

    	}
    

	spotify.search({ type: 'track', query: song }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}
    	else{
    		var songItems = data.tracks.items;
    		debugger
    		for(var i= 0; i<5 ; i++){
    

				if(songItems[i] != undefined){
					//var songPreview = songItems && songItems.preview_url ? songItems.preview_url : "No Song Info";
				var outputStr = '------------------------\n' + 
								'Song Information:\n' + 
								'------------------------\n\n' + 
								'Song Name: ' + songItems[i].name + '\n'+ 
								'Artist: ' + songItems[i].artists[0].name + '\n' + 
								'Album: ' + songItems[i].album.name + '\n' + 
								'Preview Here: ' + songItems[i].preview_url + '\n';
			
				}

			}
		console.log(outputStr);
    	}
 
	});

};

function moviethis(movie){

	

	var movieName = process.argv[3];
	var movie
	if (movieName === undefined){
		movie ="Mr.Nobody"
	}
	else{
		movie= movieName;
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";



	request(queryUrl, function(error, response, body){

 		if (!error && response.statusCode === 200) {
 			console.log("-------------------------------------")

    
    		console.log("The title of the movie is: " + JSON.parse(body).Title);
    		console.log("The movie was released in: " + JSON.parse(body).Year);
    		console.log("The imbd rating is: " + JSON.parse(body).imdbRating);
    		console.log("The rotten tomato rating is: " + JSON.parse(body).Ratings[2].Value);
    		console.log("The country it was produced in: " + JSON.parse(body).Country);
    		console.log("The language of the movie is: " + JSON.parse(body).Language);
    		console.log("The Plot of the movie is: " + JSON.parse(body).Plot);
    		console.log("The actors in this movie are: " + JSON.parse(body).Actors);
    		console.log("----------------------------------------")

  		};
	});
};
function dowhatitssay(){

	
	fs.readFile("random.txt","utf8", function(error,data){ 
		if (error) {
    		return console.log(error);
  		}
  		else{
  			var cleanData = data.split(",");
  			

  			switch(cleanData[0]){
  				case "my-tweets":
  					mytweets();
  					break;
  				case "spotify-this-song":
  					spotifythis(cleanData[1]);
  					break;
  				case "movie-this":
  					moviethis(cleanData[1]);
  					break;
  			}
  		}
  		
	});

};