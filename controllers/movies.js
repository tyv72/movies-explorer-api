const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

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
        throw new NotFoundError(`Фильм с идентификатором ${req.params.movieId} не найдена`);
      }
      if (!movie.owner._id.equals(req.user._id)) {
        throw new ForbiddenError(`Фильм с идентификатором ${req.params.movieId} добавлен другим пользователем`);
      }
    }).then(() => {
      Movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => {
          res.send({ data: movie });
        });
    })
    .catch(next);
};
