const HTTPStatus = require('http-status');

const Post = require('../models/posts');
const Message = require('../config/message');

module.exports = {
  async createPost(req, res) {
    try {
      const { title, slug } = new Post(req.body);
      await Post.findOne({ title: title, slug: slug }, (err, found) => {
        if (err) throw err;
        if (found) {
          res
            .status(HTTPStatus.EXPECTATION_FAILED)
            .json({ message: Message.ERROR_SAMETITLEORSLUG });
        } else {
          Post.create(req.body, (err, post) => {
            if (err) throw err;
            const postJson = post.toJSON();
            res.status(HTTPStatus.CREATED).json(postJson);
          });
        }
      });
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  updatePost(req, res) {},
  deletePost(req, res) {},
  getPost(req, res) {},
  getPosts(req, res) {},
};
