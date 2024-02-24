const express = require('express');
const router = express.Router();

const {
  index
} = require('../controllers/dashboard-controller');

router.route('/').get(index);

module.exports = router