const router = require('express').Router();
const movieValidator = require('../validators/movie');
const movieIdValidator = require('../validators/movieId');

const {
  sendMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', sendMovies);
router.post('/movies', movieValidator, createMovie);
router.delete('/movies/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
