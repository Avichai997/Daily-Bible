import {
  bulkUpdate,
  createOne,
  deleteMany,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '@Controllers/servicesFactory';
import User from '@Models/userModel';
import { Request } from 'express';

export const getAllUsersService = (req: Request) => {
  const users = getAll(User, req);

  return users;
};

export const getUserService = (req: Request) => {
  const user = getOne(User, req);

  return user;
};

export const createUserService = (req: Request) => {
  const user = createOne(User, req);

  return user;
};
export const updateUserService = (req: Request) => {
  const user = updateOne(User, req);

  return user;
};
export const bulkUpdateUserService = (req: Request) => {
  const user = bulkUpdate(User, req);

  return user;
};
export const deleteUserService = (req: Request) => {
  const user = deleteOne(User, req);

  return user;
};
export const deleteManyUserService = () => {
  const users = deleteMany(User);

  return users;
};