import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const CLIENT_URL = process.env.CLIENT_URL;
// eslint-disable-next-line radix
export const PORT = process.env.PORT || 5000;
export const HOST = process.env.HOST;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const JWT_COOKIE_EXPIRES_IN = parseFloat(process.env.JWT_COOKIE_EXPIRES_IN || '7');
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
