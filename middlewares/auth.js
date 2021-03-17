const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envConfig');
const { UnauthorizedError } = require('../errors');
const { INCORRECT_TOKEN_MSG } = require('../constants/errorMessages');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(INCORRECT_TOKEN_MSG);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(INCORRECT_TOKEN_MSG);
  }

  req.user = payload;

  next();
};
