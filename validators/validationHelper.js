const validator = require('validator');
const { INVALID_EMAIL_MSG, INVALID_LINK_MSG } = require('../constants/errorMessages');

module.exports.linkValidator = (value, helper) => {
  if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
    return value;
  }
  return helper.message(INVALID_LINK_MSG);
};

module.exports.emailValidator = (value, helper) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helper.message(INVALID_EMAIL_MSG);
};
