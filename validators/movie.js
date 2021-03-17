const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('./validationHelper');
const joiOpts = require('../config/joiOpts');

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.required().custom(linkValidator),
    trailer: Joi.required().custom(linkValidator),
    thumbnail: Joi.required().custom(linkValidator),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}, joiOpts);

module.exports = movieValidator;
