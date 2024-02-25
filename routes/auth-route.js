const express = require('express');
const router = express.Router();

const {
  registerUser, 
  storeUser,
  login,
  postLogin,
  logout
} = require('../controllers/auth-controller');

router.route('/register').get(registerUser);
router.route('/login').get(login).post(postLogin);
router.route('/logout').get(logout);
router.route('/').post(storeUser);

module.exports = router;