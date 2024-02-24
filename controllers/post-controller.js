const Category = require("../models/category-model");
const Post = require("../models/post-model");
const { 
  redirectWithMessage,
  renderViewWithMessage
} = require('../helpers/general-helper')

const getAllPosts = async(req, res) => {
  try {
    const posts = await Post.find({}).populate('category');
    return renderViewWithMessage(req, res, 'post/index', { posts: posts});
  } catch (error) {
    next(error);
  }
}

const createPost = async(req, res) => {
  try {
    const categories = await Category.find({});
    res.render('post/add-edit', {
      action: 'create',
      categories: categories
    });
  } catch (error) {
    next(error);
  }
}

const storePost = async(req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.category });
    const post = await Post.create({
      name: req.body.name,
      description: req.body.description,
      category: category
    });
    return redirectWithMessage(req, res, `/posts/${post._id}`, 'success', 'Post was created successfully');
  } catch (error) {
    next(error);
  }
}

const showPost = async(req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Post.findOne({ _id: postId}).populate('category');
    return renderViewWithMessage(req, res, 'post/show', { post: post });
  } catch (error) {
    next(error);
  }
}

const editPost = async(req, res) => {
  try {
    const categories = await Category.find({});
    const post = await Post.findOne({ _id: req.params.id}).populate('category');
  
    return renderViewWithMessage(req, res, 'post/add-edit', { 
      action: 'edit',
      categories: categories,
      post: post
    });
  } catch (error) {
    next(error);
  }
}

const updatePost = async(req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.category });
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      description: req.body.description,
      category: category
    });
    return redirectWithMessage(req, res, `/posts/${post._id}`, 'success', 'Post was updated successfully');
  } catch (error) {
    next(error);
  }
}

const deletePost = async(req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    return redirectWithMessage(req, res, `/posts`, 'success', 'Post was deleted successfully');
  } catch (error) {
    next(error);
  }
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