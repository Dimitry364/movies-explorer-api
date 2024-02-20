/* eslint-disable eqeqeq */
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { Created } = require('../utils/statusCode');

const { CastError } = mongoose.Error.CastError;
const { ValidationError } = mongoose.Error.ValidationError;

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(Created).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const ownerId = req.user._id;
  Movie.findById(_id)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner != ownerId) throw new ForbiddenError('Доступ запрещен');

      return movie;
    })
    .then((movie) => movie.deleteOne())
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
