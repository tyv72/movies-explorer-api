const { celebrate, Joi } = require('celebrate');
const joiOpts = require('../config/joiOpts');
const { emailValidator } = require('./validationHelper');

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(emailValidator),
  }),
}, joiOpts);

module.exports = userValidator;
