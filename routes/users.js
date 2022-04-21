const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/user');
const { userUpdateValidator } = require('../middlewares/userValidator');

router.get('/me', getUser);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
