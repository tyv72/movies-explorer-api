const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  sendMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', sendMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Страна - обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Режиссер - обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Длительность - обязательное поле',
      }),
    year: Joi.string().required().length(4)
      .messages({
        'string.length': 'Длина строки с годом должна быть равна 4',
        'any.required': 'Год создания - обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Описание - обязательное поле',
      }),
    image: Joi.required().custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка на постер к фильму');
    }).messages({
      'any.required': 'Ссылка на постер - обязательное поле',
    }),
    trailer: Joi.required().custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка на трейлер');
    }).messages({
      'any.required': 'Ссылка на трейлер - обязательное поле',
    }),
    thumbnail: Joi.required().custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка на изображение постера к фильму');
    }).messages({
      'any.required': 'Ссылка на изображение постера к фильму - обязательное поле',
    }),
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Идентификатор фильма - обязательное поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Наименование на русском языке - обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Наименование на английском языке - обязательное поле',
      }),
  }),
}), createMovie);

router.delete('/movie/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Идентификатор фильма - обязательное поле',
      }),
  }),
}), deleteMovie);

module.exports = router;
