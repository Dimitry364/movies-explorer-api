const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const login = require('./signin');
const createUser = require('./signup');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

router.use('/signin', login);
router.use('/signup', createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
