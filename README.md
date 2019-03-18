![bamazon Logo](https://github.com/Mallika1/liri-node-app/blob/master/screenshots/liri_logo.png)

:books: -- **Bamazon** Amazon-like storefront with the MySQL and node.js.

<Build Status Coverage Status First timers friendly>

The app will take in orders from customers and deplete stock from the store's inventory. App also has the ability to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

:ok_hand: Suggestions, feature requests, and issues are more than welcome!

Give **Bamazon** a spin on the [Online demo »](https://drive.google.com/file/d/1JZzxTmOKVyYKDcAJQG8CQGxV0eFLv8vE/view).

## Why

- [x] Helps customer to buy product from store.
- [x] Allows store manager to add existing product to the inventory.
- [x] Allows store manager to add new product to the inventory.
- [x] Allows store Supervisor to add new department.

## Install

Using NPM (with node.js)

 `$npm install`

## Table of Contents

* [About](#About)
* [CommandLine](#CommandLine)
   - [Customer View](#bamazonCustomer )
   - [Manager View](#bamazonManager)
   - [Supervisor View](#bamazonSupervisor)


## About

An interactive Node-based command-line (CLI) application that allows customers to buy product from the bamazon store.
Bamazon uses the mysql database to stroe the product information including product id, name, department, price and available quantity. App has 3 different view Customer View, Manager View and Supervisor View.

Below are the tables from database: 

| Products | Departments | 
| --- | --- |
| ![Liri Help](https://github.com/Mallika1/bamazon/blob/master/Screenshots/productTable.jpg)| Lists song name, artists name, preview link, album name |


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
