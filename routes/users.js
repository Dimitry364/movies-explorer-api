const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  getUserValidator,
  updateUserValidator,
} = require('../middlewares/validation');

router.get('/me', getUserValidator, getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
