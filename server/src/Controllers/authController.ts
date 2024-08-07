import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '@Models/userModel';
import { IUsers } from '@Interfaces/IUsers';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import catchAsync from '@Utils/catchAsync';
import AppError from '@Utils/AppError';
// import Email from '@Utils/email';
import { loginLimiter } from '@Middlewares/security';
import { ObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {
  JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  // CLIENT_URL
} from '@Utils/environment';
import isJwtValid from '@Utils/jti';

const DAY = 24 * 60 * 60 * 1000;

const signToken = (id: string | ObjectId) =>
  jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });

const createSendToken = (user: IUsers, statusCode: number, req: Request, res: Response) => {
  const token = signToken(user._id);
  const tokenExpiration = new Date(Date.now() + parseFloat(String(JWT_COOKIE_EXPIRES_IN)) * DAY);

  res.cookie('token', token, {
    expires: tokenExpiration,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  // eslint-disable-next-line no-param-reassign
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    // token,
    tokenExpiration,
    data: user,
  });
};

export const signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await newUser.save({ validateBeforeSave: false });

  // const token = (newUser as IUsers).createEmailConfirmToken();
  // const url = `${CLIENT_URL}/ConfirmEmail/${newUser.email}/Verify/${token}`;
  // await new Email(newUser, url).sendConfirmEmail();

  createSendToken(newUser, 201, req, res);
});

// export const confirmEmail = catchAsync(async (req, res, next) => {
//   const { email, token } = req.body;

//   // 1) Check if email and password exist
//   if (!email || !token) {
//     return next(
//       new AppError(
//         'אחד או יותר מפרטי הזיהוי חסרים! יש לשלוח כתובת אימייל וטוקן אימות מייל תקינים.',
//         400
//       )
//     );
//   }

//   const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

//   // 2) Check if user exists && token is correct
//   const user = await User.findOne({
//     email,
//     emailConfirmToken: hashedToken,
//   });

//   if (!user) return next(new AppError('המשתמש כבר אומת או אינו קיים', 403));

//   // 3) Update emailVerified property for the user
//   user.emailConfirmToken = undefined;
//   user.resetToken = undefined;
//   user.emailVerified = true;
//   await user.save({
//     validateBeforeSave: false,
//   });

//   // 4) Log the user in, send welcome email & send JWT
//   const urlSuccess = `${CLIENT_URL}/Admin/Profile`;
//   await new Email(user, urlSuccess).sendWelcome();

//   return createSendToken(user, StatusCodes.OK, req, res);
// });

// export const sendConfirmEmail = catchAsync(
//   // use it to resend email confirmation
//   async (req, res, next) => {
//     const { email } = req.body;

//     if (!email) return next(new AppError('המייל לא תקין אנא  הכנס מייל תקין', 400));

//     // 2) Check if user exists or verified
//     const user = await User.findOne({
//       email,
//     });
//     if (!user) return next(new AppError('המשתמש המבוקש אינו קיים .', StatusCodes.UNAUTHORIZED));
//     if (user.emailVerified === true) return next(new AppError('חשבון המשתמש כבר אומת', StatusCodes.UNAUTHORIZED));

//     // 3) Update emailVerified property for the user
//     const url = `${CLIENT_URL}/ConfirmEmail/${user.email}/Verify/${user.resetToken}`;
//     await new Email(user, url).sendConfirmEmail();

//     return res.status(StatusCodes.OK).json({ status: 'success' });
//   }
// );

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password)
    return next(new AppError('כתובת מייל או סיסמה חסרים! יש לנסות שוב מחדש.', 400));

  if (!req.ip) return next(new AppError('אין כתובת IP למשתמש!', 400));

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || (user.password && !user.correctPassword(password, user.password))) {
    return next(
      new AppError(
        `הסיסמה או כתובת המייל שהוזנו לא נכונים! נותרו עוד ${req.rateLimit.remaining} נסיונות להתחברות`,
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  // 3) If everything ok, reset the rate limiter for login route and send token to client
  loginLimiter.resetKey(req.ip);
  createSendToken(user, StatusCodes.OK, req, res);
});

export const loginWithGgl = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if google validation valid
  if (!isJwtValid(password, email))
    return next(new AppError('יש להזדהות דרך google או לשלוח שם משתמש וסיסמא תקינים.', 400));

  // 2) Check if email and password exist
  if (!email) return next(new AppError('כתובת מייל או סיסמה חסרים! יש לנסות שוב מחדש.', 400));

  if (!req.ip) return next(new AppError('אין כתובת IP למשתמש!', 400));

  // 3) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(
      new AppError(
        `כתובת המייל שהוזנה לא קיימת במערכת! נותרו עוד ${req.rateLimit.remaining} נסיונות להתחברות`,
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  // 4) If everything ok, reset the rate limiter for login route and send token to client
  loginLimiter.resetKey(req.ip);
  createSendToken(user, StatusCodes.OK, req, res);
});

export const logout: RequestHandler = (_req, res) => {
  res.cookie('token', 'loggedout', {
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ status: 'success', token: '' });
};

export const csrfToken: RequestHandler = (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'success', data: { csrfToken: req.csrfToken() } });
};

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token from cookies
  let token;
  if (req.cookies.token) token = req.cookies.token;
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(new AppError('אתה לא מחובר! בבקשה התחבר כדי לקבל גישה.', StatusCodes.UNAUTHORIZED));

  // 2) Verify token
  const decoded = jwt.verify(token, JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById((decoded as jwt.JwtPayload).id);
  if (!currentUser) {
    return next(new AppError('המשתמש המבוקש אינו קיים עוד.', StatusCodes.UNAUTHORIZED));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter((decoded as jwt.JwtPayload).iat))
    return next(new AppError('סיסמתך שונתה לאחרונה! נא להיכנס שוב.', StatusCodes.UNAUTHORIZED));

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export const restrictTo =
  (...roles: IUsers['role'][]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role))
      return next(new AppError(`אין לך הרשאה לבצע פעולה זו!`, 403));

    next();
  };

// export const forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on POSTed email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('לא קיים משתמש עם כתובת אימייל זו.', 404));
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // 3) Send it to user's email
//   try {
//     // const resetURL = `${req.protocol}://${req.get('host')}/ResetPassword/${resetToken}`;
//     const resetURL = `${CLIENT_URL}/ResetPassword/${resetToken}`;
//     await new Email(user, resetURL).sendPasswordReset();

//     return res.status(StatusCodes.OK).json({
//       status: 'success',
//       message: 'נשלח אליך מייל לאיפוס הסיסמה',
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(new AppError('הייתה בעיה בשליחת המייל לאיפוס סיסמה, נסה שוב מאוחר יותר!', 500));
//   }
// });

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('הוזן token לא חוקי או שפג תוקפו', 400));
  }

  // 3) Update changedPasswordAt property for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Log the user in, send JWT
  createSendToken(user, StatusCodes.OK, req, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  if (!user) return next(new AppError('משתמש לא קיים', 404));

  // 2) Check if POSTed current password is correct
  if (user.password && !(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('הסיסמה שהוזנה שגויה.', StatusCodes.UNAUTHORIZED));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, StatusCodes.OK, req, res);
});
