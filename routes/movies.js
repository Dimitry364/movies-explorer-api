const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, dleteMovieValidator } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', dleteMovieValidator, deleteMovie);

module.exports = router;
