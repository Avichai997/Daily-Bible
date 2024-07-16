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
  .post(createPostHandler) //.post(protect, restrictTo('admin'), createPostHandler)
  .patch(bulkUpdatePostsHandler)
  .delete(deleteManyPostsHandler);
//.post(protect, restrictTo('admin'), createPostHandler)
//.patch(protect, restrictTo('admin'), bulkUpdatePostsHandler)
//.delete(protect, restrictTo('admin'), deleteManyPostsHandler);

router
  .route('/:id')
  .get(getPostHandler)
  .post(createPostHandler)
  .patch(updatePostHandler)
  .delete(deletePostHandler);
//.patch(protect, restrictTo('admin'), updatePostHandler)
//.delete(protect, restrictTo('admin'), deletePostHandler);

router.route('/:id/comments').get(getPostHandler).patch(updatePostHandler);

export default router;
