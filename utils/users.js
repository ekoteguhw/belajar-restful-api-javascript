const Joi = require('joi');
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
};
