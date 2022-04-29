const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  NOT_FOUND_USER_MESSAGE,
  USER_UPDATE_PROBLEM_MESSAGE,
  sendUserInfo,
  checkDuplicateEmailError,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    })
    .then((user) => sendUserInfo(user, res))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .orFail(() => {
      throw new NotFoundError(USER_UPDATE_PROBLEM_MESSAGE);
    })
    .then((user) => sendUserInfo(user, res))
    .catch((e) => checkDuplicateEmailError(e, next));
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => (
      User
        .create({
          name,
          email,
          password: hash,
        })
    ))
    .then(({ _id }) => User.findById(_id))
    .then((user) => sendUserInfo(user, res))
    .catch((e) => checkDuplicateEmailError(e, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};
