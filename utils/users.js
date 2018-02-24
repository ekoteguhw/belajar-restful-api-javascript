const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const config = require('../config/index');
const DURATION = 60 * 60;
const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

module.exports = {
  signUp: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(regExp)
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
  },
  signIn: {
    userName: Joi.string().required(),
    password: Joi.string()
      .regex(regExp)
      .required(),
  },
  passwordRegExp: regExp,
  jwtSignUser(user) {
    return Jwt.sign(user, config.JWT_SECRET, {
      expiresIn: DURATION,
    });
  },
  toAuthJSON(user, token) {
    return {
      _id: user._id,
      userName: user.userName,
      token: token,
    };
  },
};
