const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const { passwordRegExp } = require('../utils/users');
const Message = require('../config/message');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, Message.REQUIRED_EMAIL],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: `{VALUE} ${Message.VALID_CUSTOM} email!`,
    },
  },
  firstName: {
    type: String,
    required: [true, Message.REQUIRED_FIRSTNAME],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, Message.REQUIRED_LASTNAME],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, Message.REQUIRED_USERNAME],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, Message.REQUIRED_PASSWORD],
    trim: true,
    minlength: [6, Message.LENGTH_PASSWORD],
    validate: {
      validator(password) {
        return passwordRegExp.test(password);
      },
      message: `{VALUE} ${Message.VALID_CUSTOM} password!`,
    },
  },
});

UserSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(parseInt(process.env.SALT_FACTOR), function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
