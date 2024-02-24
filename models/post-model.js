const mongoose = require('mongoose');
const Category = require('./category-model');

const PostSchema = mongoose.Schema(
  {
    'name': {
      type: String,
      required: true
    },
    'description': {
      type: String
    },
    'category': {type: mongoose.Types.ObjectId, ref: 'Category'}
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;