const { ForbiddenError, NotFoundError } = require('../errors');
const Movie = require('../models/movie');
const { MOVIE_NOT_FOUND_MSG, MOVIE_FORBIDDEN_MSG } = require('../constants/errorMessages');

module.exports.sendMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (movie == null) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      if (!movie.owner._id.equals(req.user._id)) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_MSG);
      }
      return movie.deleteOne();
    }).then((deletedMovie) => {
      res.send({ data: deletedMovie });
    })
    .catch(next);
};
