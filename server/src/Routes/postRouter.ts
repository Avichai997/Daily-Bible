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
  /**
   * @openapi
   * /posts/:
   *   get:
   *     summary: Get all posts
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: List of all posts
   */
  .get(getAllPostsHandler)
  /**
   * @openapi
   * /posts/:
   *   post:
   *     summary: Create a new post
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               authorId:
   *                 type: string
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *               photo:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: Post created
   */
  .post(protect, uploadPhoto, resizePhoto, setImageToField, createPostHandler);

router
  .route('/:id')
  /**
   * @openapi
   * /posts/{id}:
   *   patch:
   *     summary: Update a post by ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 default: ""
   *               content:
   *                 type: string
   *                 default: ""
   *               photo:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Post updated
   */
  .patch(protect, uploadPhoto, resizePhoto, setImageToField, updatePostHandler)
  /**
   * @openapi
   * /posts/{id}:
   *   delete:
   *     summary: Delete a post by ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Post deleted
   */
  .delete(protect, deletePostHandler);

/**
 * @openapi
 * /posts/{id}/comments:
 *   patch:
 *     summary: Update comments for a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comments updated
 */
router.route('/:id/comments').get(getPostHandler).patch(updatePostHandler);

export default router;
