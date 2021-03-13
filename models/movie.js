const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    validate: {
      validator(v) {
        return /^\d{4}$/gmi.test(v);
      },
      message: (props) => `Некорректное значение года: ${props.value}`,
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(v);
      },
      message: (props) => `Невалидный URL: ${props.value}`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(v);
      },
      message: (props) => `Невалидный URL: ${props.value}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(v);
      },
      message: (props) => `Невалидный URL: ${props.value}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
