import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors, { CorsOptions } from 'cors';
import { ONE_HOUR } from '@Utils/commonConstants';
import AppError from '@Utils/AppError';
import { CLIENT_URL, NODE_ENV, PORT } from '@Utils/environment';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import csrf from 'csurf';
import { Express } from 'express';
import User from '@Models/userModel';
import { StatusCodes } from 'http-status-codes';

// Set security HTTP headers
const helmetMiddleware = helmet({
  crossOriginResourcePolicy: false,
});

// CORS
const whitelist = [CLIENT_URL, `http://localhost:${PORT}`];
const corsOptions: CorsOptions = {
  credentials: true, // allow cookies
  origin: (origin, callback) => {
    // (!origin) to allow Postman requests that comes with header: origin === undefined
    const allowPostman = !origin && process.env.NODE_ENV === 'development';

    return allowPostman || (origin && whitelist.indexOf(origin) !== -1)
      ? callback(null, true) // allow request
      : callback(new AppError(`Origin: ${origin} Not allowed by CORS`, StatusCodes.FORBIDDEN)); // deny request
  },
};

const corsMiddleware = cors(corsOptions);

// Development logging
const developmentLoggingMiddleware = () => morgan('dev');

// Data sanitization against XSS
const xssMiddleware = xss();

// Limit requests from same
const limiterMiddleware = rateLimit({
  max: 500,
  windowMs: ONE_HOUR,
  message: 'נשלחו יותר מדי בקשות מכתובת ה-IP שלך, נסה שוב בעוד שעה!',
});

// Limit requests from same API to Login
export const loginLimiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'יותר מידי נסיונות התחברות, נסה שוב במועד מאוחר יותר!',
});

// Limit the attempts to login to 5 times in an hour. Reset the counter on successful login
const loginLimiterMiddleware = (app: Express) => {
  if (NODE_ENV !== 'development') app.post('/api/users/login', loginLimiter);
};

// ProtectAgainst csrf
const csrfProtectionMiddleware = csrf({
  cookie: true,
});

// Data sanitization against NoSQL query injection
const mongoSanitizeMiddleware = mongoSanitize();

// Prevent parameter pollution
const hppMiddleware = hpp({
  whitelist: [
    // Parameters for all Models
    'id',
    '_id',
    'createdAt',
    'updatedAt',
    // User Model field names
    ...Object.keys(User.schema.paths),
  ],
});

const debugMiddleware = () => {
  // eslint-disable-next-line no-console
  console.log('debug works!:');
};

export {
  helmetMiddleware,
  corsMiddleware,
  developmentLoggingMiddleware,
  xssMiddleware,
  limiterMiddleware,
  loginLimiterMiddleware,
  csrfProtectionMiddleware,
  mongoSanitizeMiddleware,
  hppMiddleware,
  debugMiddleware,
};
