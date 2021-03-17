const router = require('express').Router();
const { NotFoundError } = require('../errors');
const { RESOURSE_NOT_FOUND_MSG } = require('../constants/errorMessages');

router.all('/*', (req, res, next) => {
  next(new NotFoundError(RESOURSE_NOT_FOUND_MSG));
});

module.exports = router;
