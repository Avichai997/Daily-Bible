import express from 'express';
import {
  getAllPostsHandler,
  createPostHandler,
  bulkUpdatePostsHandler,
  deleteManyPostsHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
} from '@Controllers/postController';
import { protect, restrictTo } from '@Controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(getAllPostsHandler)
  .post(protect, restrictTo('admin'), createPostHandler)
  .patch(protect, restrictTo('admin'), bulkUpdatePostsHandler)
  .delete(protect, restrictTo('admin'), deleteManyPostsHandler);

router
  .route('/:id')
  .get(getPostHandler)
  .patch(protect, restrictTo('admin'), updatePostHandler)
  .delete(protect, restrictTo('admin'), deletePostHandler);

export default router;
