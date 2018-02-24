const HTTPStatus = require('http-status');

const User = require('../models/users');
const { jwtSignUser, toAuthJSON } = require('../utils/users');
const Message = require('../config/message');

module.exports = {
  async signUp(req, res) {
    try {
      const { userName, email } = new User(req.body);
      await User.findOne({ userName: userName, email: email }, (err, found) => {
        if (err) throw err;
        if (found) {
          res
            .status(HTTPStatus.EXPECTATION_FAILED)
            .json({ message: Message.ERROR_USEREXISTS });
        } else {
          User.create(req.body, (err, user) => {
            if (err) throw err;
            const userJson = user.toJSON();
            res
              .status(HTTPStatus.CREATED)
              .json(toAuthJSON(userJson, jwtSignUser(userJson)));
          });
        }
      });
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async signIn(req, res) {
    try {
      const { userName, password } = req.body;
      await User.findOne({ userName: userName }, (err, user) => {
        if (err) throw err;
        if (user) {
          user.comparePassword(password, (err, isMatch) => {
            if (err) throw err;
            const userJson = user.toJSON();
            res
              .status(HTTPStatus.OK)
              .json(toAuthJSON(userJson, jwtSignUser(userJson)));
          });
        } else {
          res
            .status(HTTPStatus.EXPECTATION_FAILED)
            .json({ message: Message.ERROR_USERNOTFOUND });
        }
      });
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
};
