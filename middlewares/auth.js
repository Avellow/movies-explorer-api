const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const TokenCheckError = require('../errors/TokenCheckError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthError('Необходима авторизация'));
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new TokenCheckError('Некорректный токкен'));
  }

  req.user = payload;

  return next();
};
