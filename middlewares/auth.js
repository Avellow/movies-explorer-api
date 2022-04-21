const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new Error('Необходима авторизация')); // заменить на кастомную ошибку
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new Error('Некорректный токкен')); // заменить на кастомную ошибку
  }

  req.user = payload;

  return next();
};
