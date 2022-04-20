const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new Error('Запрашиваемый пользователь не найден'); // заменить на кастомную
    })
    .then((user) => res.send(user))
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
      throw new Error('Проблема при обновлении информации о пользователе'); // заменить на кастомную
    })
    .then((user) => res.send(user))
    .catch(next);
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
    .then((user) => res.send(user))
    .catch(next);
};
