const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { NO_PATH_MESSAGE } = require('../utils/constants');

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);
  app.use('/', (req, res, next) => next(new NotFoundError(NO_PATH_MESSAGE)));
};
