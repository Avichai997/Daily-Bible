/* eslint-disable no-console */
import User from '@Models/userModel';
import Post from '@Models/postModel';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import { DB_USERNAME, DB_PASSWORD, DB_NAME } from '@Utils/environment';
import AppError from '@Utils/AppError';

// 1) Connect to DB:
const connection = mongoose.connection;

if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME) process.exit(1);

mongoose
  .set('strictQuery', true)
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.nhr2c.mongodb.net/${DB_NAME}?retryWrites=true`
  );
mongoose.connection
  .on('connected', () => {
    console.log('DB connection successful!', '\x1b[0m');
  })
  .on('error', (err) => {
    console.error('DB connection error:', err);
    throw new AppError('DB connection error:', 404);
  });

connection.once('open', () => seedData());

// 2) Read Json files:
const users = JSON.parse(readFileSync(`${__dirname}/users.json`, 'utf-8'));
const posts = JSON.parse(readFileSync(`${__dirname}/posts.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importAllData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Post.create(posts, { validateBeforeSave: false });
    console.log('Data seeded in DB!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteAllData = async () => {
  try {
    await connection.dropDatabase();
    console.log('DB dropped!');
  } catch (err) {
    console.log(err);
  }
};

async function seedData() {
  if (process.argv[2] === '--import') {
    importAllData();
  } else if (process.argv[2] === '--delete') {
    deleteAllData();
  } else if (!process.argv[2]) {
    await deleteAllData();
    await importAllData();
  }

  process.exit();
}
