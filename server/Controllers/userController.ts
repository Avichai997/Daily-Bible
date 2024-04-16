import User from '@Models/userModel';
import catchAsync from '@Utils/catchAsync';
import AppError from '@Utils/AppError';
import { IUsers } from '@Interfaces/IUsers';
import removeImage from '@Utils/removeImage';
import { StatusCodes } from 'http-status-codes';
import { getAll, getOne, updateOne, deleteOne } from './handlerFactory';

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const updateUser = updateOne(User); // don't use it for updating PASSWORD!!
export const deleteUser = deleteOne(User);

const filterObj = (obj: object, ...allowedFields: string[]) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (allowedFields.includes(el)) (newObj as any)[el] = (obj as any)[el];
  });

  return newObj;
};

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = (req.user as IUsers)._id as string;
  next();
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'הניתוב הזה לא מיועד לעדכון סיסמה! השתמש בניתוב: /updateMyPassword.',
        StatusCodes.BAD_REQUEST
      )
    );

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'email',
    'photo',
    'phoneNumber'
  );

  const oldPhoto = req.user.photo;

  if (req.body.photo && oldPhoto !== req.body.photo) removeImage(oldPhoto, 'users');

  // 3) Update user document

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  return res.status(StatusCodes.OK).json({
    status: 'success',
    data: updatedUser,
  });
});

export const deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    data: null,
  });
});
