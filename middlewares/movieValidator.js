const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const { INVALID_LINK_MESSAGE } = require('../utils/constants');

const checkUrl = (url) => {
  if (!isUrl(url, { require_protocol: true })) {
    throw new Error(INVALID_LINK_MESSAGE);
  }

  return url;
};

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrl, 'image link validation'),
    trailerLink: Joi.string().required().custom(checkUrl, 'trailer link validation'),
    thumbnail: Joi.string().required().custom(checkUrl, 'thumbnail link validation'),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdParamValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  movieValidator,
  movieIdParamValidator,
};
