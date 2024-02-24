const Category = require('../models/category-model');
const {
  renderViewWithMessage,
  redirectWithMessage
} = require('../helpers/general-helper')

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return renderViewWithMessage(req, res, 'category/index', { categories: categories });
  } catch (error) {
    next(error);
  }
}

const createCategory = (req, res) => {
  try {
    const category = new Category();
    return renderViewWithMessage(req, res, 'category/add-edit', {
      action: 'create',
      category: category
    });
  } catch (error) {
    next(error);
  }
}

const storeCategory = async (req, res) => {
  try {
    const categoryCreated = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    return redirectWithMessage(req, res, `/categories/${categoryCreated._id}`, 'success', 'Category was created successfully');
  } catch (error) {
    next(error);
  }
}

const showCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id});
    return renderViewWithMessage(req, res, 'category/show', {
      category: category
    });
  } catch (error) {
    next(error);
  }
}

const editCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.render('category/add-edit', {
      action: 'edit',
      category: category
    });
  } catch (error) {
    next(error);
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({_id: req.params.id}, {
      name: req.body.name,
      description: req.body.description
    });
    return redirectWithMessage(req, res, `/categories/${category._id}`, 'success', 'Category was updated successfully');
  } catch (error) {
    next(error);
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    return redirectWithMessage(req, res, '/categories', 'success', 'Category was deleted successfully');
  } catch (error) {
    next(error);
  }
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