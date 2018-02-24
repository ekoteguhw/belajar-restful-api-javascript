const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const usersController = require('../controllers/users');
const usersValidation = require('../utils/users');
const { authLocal } = require('../services/isAuthenticated');

router.post(
  '/sign_up',
  validate(usersValidation.signUp),
  usersController.signUp,
);

router.post('/sign_in', authLocal, usersController.signIn);

module.exports = router;
