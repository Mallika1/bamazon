![Liri Logo](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/liri_logo.png)

:books: -- **Liri** a Language Interpretation and Recognition Interface.

<Build Status Coverage Status First timers friendly>

Whether you input your favorite song name, movie name or event name, Liri helps you find name, artist(s) name,preview link, album name, event venue and many other informations.

For example, movie-name is given to **Liri** , it will show you 

* Title of the Movie.
* Year the Movie Came Out.
* IMDB Rating of the Movie.
* Rotten Tomatoes Rating of the Movie.
* Country Where the Movie Was Produced.
* Actors in the Movie.

:ok_hand: Suggestions, feature requests, and issues are more than welcome!

Give **Liri** a spin on the [Online demo »](https://drive.google.com/file/d/1JZzxTmOKVyYKDcAJQG8CQGxV0eFLv8vE/view).

## Why

- [x] Helps to get details about your favorite songs.
- [x] Helps to find event location details.
- [x] Helps to find movie rating from IMDB and Rotton Tomatos.

## Install

Using NPM (with node.js)

 `$npm install`

## Table of Contents

* [About](#About)
* [Functionality](#Functionality)
* [CommandLine](#CommandLine)
   - [spotigy-this-song](#Spotigy-this-song )
   - [movie-this](#Movie-this)
   - [concert-this](#Concert-this)
   - [do-what-it-says](#do-what-it-says)


## About

An interactive Node-based command-line (CLI) application that takes in parameters and gives you back data.
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface.Liri searches Spotify for songs, Bands in Town for concerts, and OMDB for movies. LIRI take these four commands: concert-this, spotify-this-song, movie-this, and do-what-it-says.


## Functionality

| Command | Output | 
| --- | --- |
| `node liri.js spotify-this-song <song-name>` | Lists song name, artists name, preview link, album name |
| `node liri.js movie-this <movie-name>` | Lists movie title, year, rating, country, actors |
| `node liri.js concert-this <band or artists -name>` | List venue name, location, date |
| `node liri.js do-what-it-says` | Reads the above mentioned commands from random.txt |


## CommandLine

When no input argument or --help is given to Liri, it displays the help information.
![Liri Help](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/cmdhelp.JPG)


### Spotigy-this-song 

* The ```node liri.js spotify-this-song '<song name here>'``` command will output the following information about the song in your  console and in `log.txt` file:
     - Artist(s)
     - The song's name
     - A preview link of the song from Spotify
     - The album that the song is from

* If no song name is provided to Liri, It will take "The Sign" by Ace of Base by default.

![Liri Spotify](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/concert.JPG)

### Movie-this

* The ```node liri.js movie-this '<movie name here>'``` command will search the OMDb API for a movie and show the following information to your terminal/bash window and in `log.txt` file:
    - Name of the venue
    - Title of the movie
    - Year the movie came out.
    - IMDB Rating of the movie
    - Rotten Tomatoes Rating of the movie
    - Country where the movie was produced
    - Language of the movie
    - Plot of the movie
    - Actors in the movie

* If no movie name is provided to Liri, It will take 'Mr. Nobody by default.'

![Liri Movie](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/movie.jpg)

### Concert-this

* The ```node liri.js concert-this '<artist/band name here>'``` command will search the Bands in Town Artist Events API for an artist and render the following information about each event to your terminal/bash window and in `log.txt` file :
    - Name of the venue
    - Venue location
    - Date of the Event (used moment to format this as "MM/DD/YYYY")

![Liri Concert](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/concert.JPG)

### do-what-it-says

If you provide The ```node liri.js do-what-it-says``` command Liri reads `randam.txt` file from the current directory.
Let’s say randam.txt looks as follows:

`concert-this,maroon 5`  then it will run `node liri.js concert-this maroon 5`

![Liri Randam](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/dowhatitsay.jpg