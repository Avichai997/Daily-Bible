import express from 'express';
import {
  getMe,
  getUser,
  updateMe,
  deleteMe,
  getAllUsers,
  updateUser,
  deleteUser,
} from '@Controllers/userController';
import {
  signup,
  login,
  resetPassword,
  protect,
  updatePassword,
  logout,
  restrictTo,
  loginWithGgl,
  // sendConfirmEmail,
} from '@Controllers/authController';
import { resizePhoto, uploadPhoto } from '@Middlewares/uploadImage';

const router = express.Router();

/**
 * @openapi
 * /users/signup:
 *   post:
 *     summary: User signup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/signup', signup);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post('/login', login);
router.post('/loginWithGgl', loginWithGgl);

/**
 * @openapi
 * /users/logout:
 *   get:
 *     summary: User logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.get('/logout', logout);

/**
 * @openapi
 * /users/resetPassword/{token}:
 *   patch:
 *     summary: Reset password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
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
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get('/me', getMe, getUser);

/**
 * @openapi
 * /users/updateMe:
 *   patch:
 *     summary: Update current user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: ""
 *               lastName:
 *                 type: string
 *                 default: ""
 *               email:
 *                 type: string
 *                 default: ""
 *               phoneNumber:
 *                 type: string
 *                 default: ""
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch('/updateMe', uploadPhoto, resizePhoto, updateMe);

/**
 * @openapi
 * /users/updateMyPassword:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.patch('/updateMyPassword', updatePassword);

/**
 * @openapi
 * /users/deleteMe:
 *   delete:
 *     summary: Delete current user
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete('/deleteMe', deleteMe);

// Restrict all routes after this middleware to admin only
router.use(restrictTo('admin'));

/**
 * @openapi
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.route('/').get(getAllUsers);

router
  .route('/:id')
  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User data
   */
  .get(getUser)
  /**
   * @openapi
   * /users/{id}:
   *   patch:
   *     summary: Update a user by ID
   *     tags: [Users]
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
   *               firstName:
   *                 type: string
   *                 default: ""
   *               lastName:
   *                 type: string
   *                 default: ""
   *               email:
   *                 type: string
   *                 default: ""
   *               phoneNumber:
   *                 type: string
   *                 default: ""
   *               photo:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: User updated
   */
  .patch(uploadPhoto, resizePhoto, updateUser)
  /**
   * @openapi
   * /users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: User deleted
   */
  .delete(deleteUser);

export default router;
