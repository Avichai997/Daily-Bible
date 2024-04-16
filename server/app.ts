// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./Interfaces/global/xss-clean.d.ts" />

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import globalErrorHandler from '@Controllers/errorController';
import AppError from '@Utils/AppError';
import userRouter from '@Routes/userRouter';
import postRouter from '@Routes/postRouter';
import {
  helmetMiddleware,
  corsMiddleware,
  xssMiddleware,
  limiterMiddleware,
  mongoSanitizeMiddleware,
  hppMiddleware,
  loginLimiterMiddleware,
} from '@Middlewares/security';
import { StatusCodes } from 'http-status-codes';
import { version } from './package.json';

const app = express();

// app.options('*', cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

app.use(express.static('./public'));
app.use(compression());

// Security middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(xssMiddleware);
app.use('/api', limiterMiddleware);
loginLimiterMiddleware(app);
app.use(mongoSanitizeMiddleware);
app.use(hppMiddleware);

// 2) ROUTES
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.get('/api/health', (_req, res) =>
  res.status(StatusCodes.OK).json(`Server is healthy and running v${version}`)
);

app.all('*', (req, _res, next) =>
  next(new AppError(`הכתובת ${req.originalUrl} לא קיימת בשרת!`, StatusCodes.NOT_FOUND))
);

// all AppError instances errors will catch in this middleware and will be handled in errorController.js
app.use(globalErrorHandler);

export default app;
