const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie
    .findById({ _id: movieId })
    .orFail(() => {
      throw new NotFoundError(`Фильм с id ${movieId} не найден!`);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new PermissionError('Отказано в удалении. Пользователь не является владельцом!');
      }
      return Movie.findByIdAndRemove({ _id: movieId });
    })
    .then((movie) => res.send({ message: 'Успешно удален фильм:', data: movie }))
    .catch(next);
};
