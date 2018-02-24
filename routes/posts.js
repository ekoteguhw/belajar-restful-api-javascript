const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const postsController = require('../controllers/posts');
const postsValidation = require('../utils/posts');

router.post(
  '/create',
  validate(postsValidation.createPost),
  postsController.createPost,
);

router.post(
  '/update',
  validate(postsValidation.updatePost),
  postsController.updatePost,
);

router.post(
  '/delete',
  validate(postsValidation.deletePost),
  postsController.deletePost,
);

router.get(
  '/get/:slug',
  validate(postsValidation.getPost),
  postsController.getPost,
);

router.get('/', validate(postsValidation.getPosts), postsController.getPosts);

module.exports = router;
