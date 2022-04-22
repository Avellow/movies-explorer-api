const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');

const { NODE_ENV, JWT_SECRET } = process.env;

const sendUserInfo = ({ email, name }, res) => res.send({ email, name });

const checkDuplicateEmailError = (e, next) => {
  if (e.code === 11000) {
    return next(new DuplicateError('Пользователь с таким email уже существует!'));
  }
  return next(e);
};

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
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
      throw new NotFoundError('Проблема при обновлении информации о пользователе');
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
