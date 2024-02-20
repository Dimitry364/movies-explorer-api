const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { jwtKey } = require('../utils/jwtKey');
const { Created } = require('../utils/statusCode');

const { CastError } = mongoose.Error.CastError;
const { ValidationError } = mongoose.Error.ValidationError;

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

const getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name, email, password: hash,
  })
    .then((user) => res.status(Created).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегестрирован'),
        );
      } else next(err);
    }));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегестрирован'),
        );
      } else next(err);
    });
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  login,
};
