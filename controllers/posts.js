const HTTPStatus = require('http-status');

const Post = require('../models/posts');
const User = require('../models/users');
const Message = require('../config/message');

module.exports = {
  async createPost(req, res) {
    try {
      const post = Post.create(req.body, req.user._id);
      res.status(HTTPStatus.CREATED).json(post);
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post.user.equals(req.user._id)) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(req.body).forEach(key => {
        post[key] = req.body[key];
      });

      return res.status(HTTPStatus.OK).json(await post.save());
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.user.equals(req.user._id)) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }
      await post.remove();
      return res.sendStatus(HTTPStatus.OK);
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async getPostById(req, res) {
    try {
      const promise = await Promise.all([
        User.findById(req.user._id),
        Post.findById(req.params.id).populate('user'),
      ]);

      const favorite = promise[0]._favorites.isPostFavorite(req.params.id);
      const post = promise[1];

      return res.status(HTTPStatus.OK).json({
        ...post.toJSON(),
        favorite,
      });
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async getPostsList(req, res) {
    try {
      const limit = parseInt(req.query.limit, 0);
      const skip = parseInt(req.query.skip, 0);

      const promise = await Promise.all([
        User.findById(req.user._id),
        Post.list({ limit, skip }),
      ]);

      const posts = promise[1].reduce((arr, post) => {
        const favorite = promise[0]._favorites.isPostFavorite(post._id);

        arr.push({
          ...post.toJSON(),
          favorite,
        });

        return arr;
      }, []);

      return res.status(HTTPStatus.OK).json(posts);
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
  async favoritePost(req, res) {
    try {
      const user = await User.findById(req.user._id);
      await user._favorites.posts(req.params.id);
      return res.sendStatus(HTTPStatus.OK);
    } catch (err) {
      res.status(HTTPStatus.BAD_REQUEST).json(err);
    }
  },
};
