const HTTPStatus = require('http-status');

const User = require('../models/users');
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
            res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
          });
        }
      });
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  signIn(req, res, next) {
    res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
    next();
  },
};
