const User = require('../models/users');
module.exports = {
  async signUp(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
