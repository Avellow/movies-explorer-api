const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { movieValidator } = require('../middlewares/movieValidator');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
