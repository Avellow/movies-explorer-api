const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const TokenCheckError = require('../errors/TokenCheckError');
const { NOT_AUTH_MESSAGE, TOKEN_PROBLEM_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthError(NOT_AUTH_MESSAGE));
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new TokenCheckError(TOKEN_PROBLEM_MESSAGE));
  }

  req.user = payload;

  return next();
};
