const express = require('express');
const multer = require('multer');
const signup = require('../controllers/users.controller');
const { watermarker } = require('../middleware');

const userRoute = express.Router();
userRoute
  .route('/signup')
  .post(
    multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
      'avatar'
    ),
    watermarker,
    signup
  );

module.exports = userRoute;
