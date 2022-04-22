const usersRouter = require('./users');
const moviesRouter = require('./movies');

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);
};
