var express = require('express');
var router = express.Router();
var movies = require('../mock-data/movies');
var knex = require('../db/knexConfig');

router.get('/', function(req, res) {
  res.status(200).send(movies)
});

router.get('/title/:titleQuery', function(req, res) {
    // /movies/Titanic
    let titleParam = req.params.titleQuery.toLowerCase();
    let movieList = [];
    movies.forEach((movie) => {
        if(movie.title.toLowerCase().includes(titleParam)) {
            movieList.push(movie)
        }
    })
    res.send(movieList);
  //res.send(movies[req.params.titleQuery-1])
});

router.get('/id/:movieId', function(req, res) {
  // /movies/Titanic
  let movieId = parseInt(req.params.movieId) // "1"
  console.log('this is the movie id:', typeof movieId)
  
  if(movieId > movies.length){
    res.status(404).send('Movie ID not found');
    return
  }

  if(Number.isNaN(movieId)){
    res.status(400).send('Invalid ID supplied');
    return
  }

  movies.forEach((movie) => {
    if(movie.id === movieId) {
      console.log(movie)
        res.send(movie)
        return
    }
  })
});

//we started doing knex afterwards
router.post('/', function(req, res, next) {
  knex('express_checkpoint_movies').insert(req.body)
})

module.exports = router;