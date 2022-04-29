const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { movieValidator, movieIdParamValidator } = require('../middlewares/movieValidator');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', movieIdParamValidator, deleteMovie);

module.exports = router;
