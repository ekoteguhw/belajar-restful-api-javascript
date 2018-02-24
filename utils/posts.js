const Joi = require('joi');

module.exports = {
  createPost: {
    title: Joi.string().required(),
    slug: Joi.string().required(),
    content: Joi.string(),
    userName: Joi.string().required(),
  },
  updatePost: {
    title: Joi.string().required(),
    slug: Joi.string().required(),
    content: Joi.string(),
    userName: Joi.string().required(),
  },
  deletePost: {},
  getPost: {},
  getPosts: {},
};
