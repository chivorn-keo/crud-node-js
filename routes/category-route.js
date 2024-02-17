const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  storeCategory,
  editCategory,
  updateCategory,
  deleteCategory,
  showCategory
} = require('../controllers/category-controller');

router.route('/').get(getAllCategories).post(storeCategory);
router.route('/create').get(createCategory);

router.route('/:id').get(showCategory).put(updateCategory).delete(deleteCategory);
router.route('/:id/edit').get(editCategory);

module.exports = router