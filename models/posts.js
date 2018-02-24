const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = require('../config/message');

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, Message.REQUIRED_TITLE],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: [true, Message.REQUIRED_SLUG],
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, Message.REQUIRED_USERNAME],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Post', PostSchema);
