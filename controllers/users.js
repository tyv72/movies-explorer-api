const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../errors');
const { JWT_SECRET } = require('../config/envConfig');
const { USER_CONFLICT_MSG, USER_NOT_FOUND_MSG } = require('../constants/errorMessages');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(USER_CONFLICT_MSG);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(({ _id }) => res.send({ data: _id }))
    .catch(next);
};

module.exports.sendUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
