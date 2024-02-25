const express = require('express');
const router = express.Router();

const {
  registerUser, 
  storeUser
} = require('../controllers/auth-controller');

router.route('/register').get(registerUser);
router.route('/').post(storeUser);

module.exports = router;