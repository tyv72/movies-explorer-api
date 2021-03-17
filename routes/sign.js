const router = require('express').Router();
const loginValidator = require('../validators/login');
const registerValidator = require('../validators/register');
const { createUser, login } = require('../controllers/users');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

module.exports = router;
