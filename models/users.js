const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const { passwordRegExp } = require('../utils/users');

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  firstName: {
    type: String,
    required: [true, 'Firstname is required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Lastname is required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password) {
        return passwordRegExp.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});

module.exports = mongoose.model('User', User);
