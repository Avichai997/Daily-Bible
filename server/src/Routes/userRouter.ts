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
} from '@Controllers/authController';
import { uploadUserPhoto, resizeUserPhoto } from '@Middlewares/uploadImage';

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
 *               email:
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
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 */
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

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
 *               newPassword:
 *                 type: string
 *               newPasswordConfirm:
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 */
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
router
  .route('/:id')
  .get(getUser)
  .patch(uploadUserPhoto, resizeUserPhoto, updateUser)
  .delete(deleteUser);

export default router;
