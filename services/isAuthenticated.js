const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/users');
const config = require('../config/index');
const Message = require('../config/message');

const localOptions = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      await User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false, { message: Message.ERROR_EMAIL });
        }
        user.validPassword(password, (err, isMatch) => {
          if (err) {
            return done(err, false);
          }
          if (isMatch === true) {
            return done(null, user, { message: Message.SUCCESSFUL_LOGIN });
          } else {
            return done(null, false, { message: Message.ERROR_PASSWORD });
          }
        });
      });
    } catch (err) {
      return done(err, false);
    }
  },
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payloads, done) => {
  try {
    await User.findById(payloads._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false, { message: Message.ERROR_NOTACCESSIBLE });
      }
      return done(null, user);
    });
  } catch (err) {
    return done(err, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = {
  authLocal: passport.authenticate('local', { session: false }),
  authJwt: passport.authenticate('jwt', { session: false }),
};
