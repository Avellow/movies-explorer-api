const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);
  app.use('/', (req, res, next) => next(new NotFoundError('Путь с таким запросом не существует')));
};
