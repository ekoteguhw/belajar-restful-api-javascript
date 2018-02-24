const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

const Message = require('../config/message');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, Message.REQUIRED_TITLE],
      minlength: [3, Message.LENGTH_TITLE],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
      minlength: [10, Message.LENGTH_CONTENT],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

PostSchema.pre('validate', function(next) {
  this._slugify();
  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      slug: this.slug,
      user: this.user,
      favoriteCount: this.favoriteCount,
    };
  },
};

PostSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate(user);
  },
  incFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },
  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  },
};

module.exports = mongoose.model('Post', PostSchema);
