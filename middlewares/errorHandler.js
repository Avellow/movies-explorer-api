const { SERVER_PROBLEM_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = SERVER_PROBLEM_MESSAGE,
  } = err;

  console.log(err.stack || err);

  res
    .status(statusCode)
    .send({
      message: `${statusCode} ${message}`,
    });

  next();
};

module.exports = errorHandler;
