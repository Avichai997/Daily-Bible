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
  // confirmEmail,
  login,
  // forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  logout,
  restrictTo,
  loginWithGgl,
  // sendConfirmEmail,
} from '@Controllers/authController';
import { resizePhoto, setImageToField, uploadPhoto } from '@Middlewares/uploadImage';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', login)
  .post('/loginWithGgl', loginWithGgl)
  .get('/logout', logout)
  // .post('/forgotPassword', forgotPassword)
  .patch('/resetPassword/:token', resetPassword)
  // .post('/sendConfirmEmail', sendConfirmEmail)

  .use(protect)
  // Protect all this routes after this middleware. this routes is only for signed-in users.
  // .post('/confirmEmail', confirmEmail)
  .get('/me', getMe, getUser)
  .patch('/updateMe', uploadPhoto, resizePhoto, updateMe)
  .patch('/updateMyPassword', updatePassword)
  .delete('/deleteMe', deleteMe)
  // Restrict all this routes to Admin only.
  .use(restrictTo('admin'));

router.route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(uploadPhoto, resizePhoto, setImageToField, updateUser)
  .delete(deleteUser);

export default router;
