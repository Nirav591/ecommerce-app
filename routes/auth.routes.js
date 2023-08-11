const express = require('express');
const { createUser, loginUser, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { checkUsernameOrEmail } = require('../middleware/verifySignUp');
const router = express.Router();

router
  .post('/signup', checkUsernameOrEmail, createUser)
  .post('/signin', loginUser)
  .post('/forgotPassword', forgotPassword)
  .post('/resetPassword', resetPassword);

exports.router = router;
