const { Joi, celebrate } = require('celebrate');
const joiOpts = require('../config/joiOpts');
const { emailValidator } = require('./validationHelper');

const registerValidator = celebrate({
  body: {
    password: Joi.string().min(8).required(),
    email: Joi.string().required().custom(emailValidator),
    name: Joi.string().required().min(2).max(30),
  },
}, joiOpts);

module.exports = registerValidator;
