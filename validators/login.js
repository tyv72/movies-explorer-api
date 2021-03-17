const { Joi, celebrate } = require('celebrate');
const joiOpts = require('../config/joiOpts');
const { emailValidator } = require('./validationHelper');

const loginValidator = celebrate({
  body: {
    password: Joi.string().min(8).required(),
    email: Joi.string().required().custom(emailValidator),
  },
}, joiOpts);

module.exports = loginValidator;
