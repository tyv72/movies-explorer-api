const router = require('express').Router();
const userValidator = require('../validators/user');

const {
  sendUser,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', sendUser);
router.patch('/users/me', userValidator, updateUser);

module.exports = router;
