const Category = require('../models/category-model');
const {
  renderViewWithMessage,
  redirectWithMessage
} = require('../helpers/general-helper')

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  return renderViewWithMessage(req, res, 'category/index', { categories: categories });
}

const createCategory = (req, res) => {
  const category = new Category();
  return renderViewWithMessage(req, res, 'category/add-edit', {
    action: 'create',
    category: category
  });
}

const storeCategory = async (req, res) => {
  const categoryCreated = await Category.create({
    name: req.body.name,
    description: req.body.description
  });
  return redirectWithMessage(req, res, `/categories/${categoryCreated._id}`, 'success', 'Category was created successfully');
}

const showCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id});
  return renderViewWithMessage(req, res, 'category/show', {
    category: category
  });
}

const editCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  res.render('category/add-edit', {
    action: 'edit',
    category: category
  });
}

const updateCategory = async (req, res) => {
  const category = await Category.findOneAndUpdate({_id: req.params.id}, {
    name: req.body.name,
    description: req.body.description
  });
  return redirectWithMessage(req, res, `/categories/${category._id}`, 'success', 'Category was updated successfully');
}

const deleteCategory = async (req, res) => {
  const category = await Category.findOneAndDelete({ _id: req.params.id });
  return redirectWithMessage(req, res, '/categories', 'success', 'Category was deleted successfully');
}

module.exports = {
  getAllCategories,
  createCategory,
  storeCategory,
  showCategory,
  editCategory,
  updateCategory,
  deleteCategory
}