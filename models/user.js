const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { UnauthorizedError } = require('../errors');
const { INVALID_EMAIL_MSG, UNAUTHORIZED_MSG } = require('../constants/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: INVALID_EMAIL_MSG,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_MSG);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(UNAUTHORIZED_MSG);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
