const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { passwordRegExp } = require('../utils/users');
const Post = require('../models/posts');
const Message = require('../config/message');
const DURATION = 60 * 60;
const config = require('../config/index');

const UserSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
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

UserSchema.methods = {
  validPassword(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err, null);
      return cb(null, isMatch);
    });
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: this.jwtSignUser(),
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
  jwtSignUser() {
    return Jwt.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: DURATION,
    });
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        this.favorites.posts.remove(postId);
        await Post.decFavoriteCount(postId);
      } else {
        this.favorites.posts.push(postId);
        await Post.incFavoriteCount(postId);
      }

      return this.save();
    },
    isPostIsFavorite(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        return true;
      }

      return false;
    },
  },
};

module.exports = mongoose.model('User', UserSchema);
