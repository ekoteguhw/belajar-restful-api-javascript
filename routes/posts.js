const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const postsController = require('../controllers/posts');
const postsValidation = require('../utils/posts');

const { authJwt } = require('../services/isAuthenticated');

router.post(
  '/create',
  authJwt,
  validate(postsValidation.createPost),
  postsController.createPost,
);

router.post(
  '/update',
  authJwt,
  validate(postsValidation.updatePost),
  postsController.updatePost,
);

router.post(
  '/delete',
  authJwt,
  validate(postsValidation.deletePost),
  postsController.deletePost,
);

router.get(
  '/get/:slug',
  authJwt,
  validate(postsValidation.getPost),
  postsController.getPost,
);

router.get(
  '/',
  authJwt,
  validate(postsValidation.getPosts),
  postsController.getPosts,
);

module.exports = router;
