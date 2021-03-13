const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const {
  sendUser,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', sendUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Длина имени должна быть не менее 2 символов',
        'string.max': 'Длина имени должна быть не более 30 символов',
        'any.required': 'Имя пользователя - обязательное поле',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
  }),
}), updateUser);

module.exports = router;
