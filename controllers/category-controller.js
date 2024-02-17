const Category = require('../models/category-model');
const { renderFile } = require('extended-ejs');

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.render('category/index', {
    categories: categories
  });
}

const createCategory = (req, res) => {
  const category = new Category();

  res.render('category/add-edit', {
    action: 'create',
    category: category
  });
}

const storeCategory = async (req, res) => {
  const category = {
    name: req.body.name,
    description: req.body.description
  }
  await Category.create(category);
  res.redirect('/categories');
}

const editCategory = async (req, res) => {
  const {id: categoryId} = req.params;
  const category = await Category.findOne({ _id: categoryId });

  if(!category){
    res.redirect('/categories');
  }

  res.render('category/add-edit', {
    action: 'edit',
    category: category
  });
}

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const categoryParams = {
    name: req.body.name,
    description: req.body.description
  }

  const category = await Category.findOneAndUpdate({_id: categoryId}, categoryParams);
  if(!category){
    res.redirect('/categories');
  }

  res.redirect('/categories');
}

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  const category = await Category.findOneAndDelete({ _id: categoryId });
  if(!category){
    res.redirect('/categories');
  }

  res.redirect('/categories');
}

module.exports = {
  getAllCategories,
  createCategory,
  storeCategory,
  editCategory,
  updateCategory,
  deleteCategory
}