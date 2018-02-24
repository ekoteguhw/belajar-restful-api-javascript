const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const postsController = require('../controllers/posts');
const postsValidation = require('../utils/posts');

const { authJwt } = require('../services/isAuthenticated');

router.post(
  '/',
  authJwt,
  validate(postsValidation.createPost),
  postsController.createPost,
);

router.patch(
  '/:id',
  authJwt,
  validate(postsValidation.updatePost),
  postsController.updatePost,
);

router.delete('/:id', authJwt, postsController.deletePost);
router.get('/:id', authJwt, postsController.getPostById);
router.get('/', authJwt, postsController.getPostsList);
router.post('/:id/favorite', authJwt, postsController.favoritePost);

module.exports = router;
