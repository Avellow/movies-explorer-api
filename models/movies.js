const mongoose = require('mongoose');

function validateLink(v) {
  const regex = /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi;
  return regex.test(v);
}

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
      validator: validateLink,
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: String, // or ObjectId ???
    required: true,
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
