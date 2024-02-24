const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  createPost,
  showPost,
  storePost,
  editPost,
  updatePost,
  deletePost,
} = require('../controllers/post-controller');

router.route('/').get(getAllPosts).post(storePost);
router.route('/create').get(createPost);
router.route('/:id').get(showPost).put(updatePost).delete(deletePost);
router.route('/:id/edit').get(editPost);

module.exports = router