const DuplicateError = require('../errors/DuplicateError');

const NOT_FOUND_MOVIE_MESSAGE = (id) => `Фильм с id ${id} не найден!`;
const NO_RIGHT_MESSAGE = 'Вам не разрешено это действие!';
const USER_EXISTS_MESSAGE = 'Пользователь с таким email уже существует!';
const NOT_FOUND_USER_MESSAGE = 'Пользователь не найден';
const USER_UPDATE_PROBLEM_MESSAGE = 'При обновлении информации произошла ошибка';
const NOT_AUTH_MESSAGE = 'Необходима авторизация';
const TOKEN_PROBLEM_MESSAGE = 'Некорректный токен';
const SERVER_PROBLEM_MESSAGE = 'Произошла ошибка на сервере';
const INVALID_LINK_MESSAGE = 'Невалидная ссылка';
const INVALID_EMAIL_MESSAGE = 'Невалидный email';
const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль!';
const NO_PATH_MESSAGE = 'Путь с таким запросом не существует';

const sendUserInfo = ({ email, name }, res) => res.send({ email, name });

const checkDuplicateEmailError = (e, next) => {
  if (e.code === 11000) {
    return next(new DuplicateError(USER_EXISTS_MESSAGE));
  }
  return next(e);
};

module.exports = {
  NO_RIGHT_MESSAGE,
  USER_EXISTS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  USER_UPDATE_PROBLEM_MESSAGE,
  NOT_AUTH_MESSAGE,
  TOKEN_PROBLEM_MESSAGE,
  SERVER_PROBLEM_MESSAGE,
  INVALID_LINK_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  AUTH_ERROR_MESSAGE,
  NO_PATH_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  sendUserInfo,
  checkDuplicateEmailError,
};
