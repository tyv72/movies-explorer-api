const { celebrate, Joi } = require('celebrate');
const joiOpts = require('../config/joiOpts');

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}, joiOpts);

module.exports = movieIdValidator;
