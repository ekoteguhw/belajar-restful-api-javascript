const Joi = require('joi');

module.exports = {
  createPost: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      slug: Joi.string().required(),
      content: Joi.string().min(10),
    },
  },
  updatePost: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      slug: Joi.string().required(),
      content: Joi.string().min(10),
    },
  },
};
