const Category = require('../models/category-model');
const Post = require('../models/post-model');

const index = async (req, res) => {

  const categories = await Category.find({});
  const posts = await Post.find({});

  return res.render('dashboard', {
    countCategories: categories.length,
    countPosts: posts.length
  });
}

module.exports = {
  index
}