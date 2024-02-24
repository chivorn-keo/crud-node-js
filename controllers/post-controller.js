const Category = require("../models/category-model");
const Post = require("../models/post-model");
const { 
  redirectWithMessage,
  renderViewWithMessage
} = require('../helpers/general-helper')

const getAllPosts = async(req, res) => {
  const posts = await Post.find({}).populate('category');
  return renderViewWithMessage(req, res, 'post/index', { posts: posts});
}

const createPost = async(req, res) => {
  const categories = await Category.find({});
  res.render('post/add-edit', {
    action: 'create',
    categories: categories
  });
}

const storePost = async(req, res) => {
  const category = await Category.findOne({ _id: req.body.category });
  const post = await Post.create({
    name: req.body.name,
    description: req.body.description,
    category: category
  });

  return redirectWithMessage(req, res, `/posts/${post._id}`, 'success', 'Post was created successfully');
}

const showPost = async(req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId}).populate('category');
  return renderViewWithMessage(req, res, 'post/show', { post: post });
}

const editPost = async(req, res) => {
  const { id : postId } = req.params;
  
  const categories = await Category.find({});
  const post = await Post.findOne({ _id: postId}).populate('category');

  return renderViewWithMessage(req, res, 'post/add-edit', { 
    action: 'edit',
    categories: categories,
    post: post
  });
}

const updatePost = async(req, res) => {
  const category = await Category.findOne({ _id: req.body.category });
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    description: req.body.description,
    category: category
  });
  return redirectWithMessage(req, res, `/posts/${post._id}`, 'success', 'Post was updated successfully');
}

const deletePost = async(req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id });
  return redirectWithMessage(req, res, `/posts`, 'success', 'Post was deleted successfully');
}

module.exports = {
  getAllPosts,
  showPost,
  createPost,
  storePost,
  editPost,
  updatePost,
  deletePost
}