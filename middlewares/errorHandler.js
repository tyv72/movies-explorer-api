const { CelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err instanceof CelebrateError) {
    res
      .status(400)
      .send({
        message: err.details.get('body'),
      });
  }

  res
    .status(statusCode)
    .send({ message });
};

module.exports = {
  errorHandler,
};
