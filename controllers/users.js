const User = require('../models/users');
module.exports = {
  async signUp(req, res) {
    try {
      const { userName, email } = new User(req.body);
      await User.findOne({ userName: userName, email: email }, (err, found) => {
        if (err) throw err;
        if (found) {
          res.status(500).json({ message: 'User already exists!' });
        } else {
          User.create(req.body, (err, user) => {
            if (err) throw err;
            res.status(201).json(user);
          });
        }
      });
    } catch (err) {
      res.status(500).json(err);
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
            res.status(201).json(user);
          });
        } else {
          res.status(500).json({ message: 'User is not found!' });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
