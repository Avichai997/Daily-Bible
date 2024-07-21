import express from 'express';
import {
  getAllPostsHandler,
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
} from '@Controllers/postController';
import { protect } from '@Controllers/authController';
import { resizePhoto, setImageToField, uploadPhoto } from '@Middlewares/uploadImage';

const router = express.Router();

router
  .route('/')
  .get(getAllPostsHandler)
  .post(protect, uploadPhoto, resizePhoto, setImageToField, createPostHandler);

router
  .route('/:id')
  .patch(protect, uploadPhoto, resizePhoto, setImageToField, updatePostHandler)
  .delete(protect, deletePostHandler);

router.route('/:id/comments').get(getPostHandler).patch(updatePostHandler);

export default router;
