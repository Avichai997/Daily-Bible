import catchAsync from '@Utils/catchAsync';
import {
  bulkUpdatePostService,
  createPostService,
  deletePostService,
  deleteManyPostService,
  getAllPostsService,
  getPostService,
  updatePostService,
} from '@Services/postService';
import { StatusCodes } from 'http-status-codes';

export const getAllPostsHandler = catchAsync(async (req, res) => {
  const posts = await getAllPostsService(req);
  res.status(StatusCodes.OK).json(posts);
});
export const getPostHandler = catchAsync(async (req, res) => {
  const post = await getPostService(req);
  res.status(StatusCodes.OK).json(post);
});
export const createPostHandler = catchAsync(async (req, res) => {
  const post = await createPostService(req);
  res.status(StatusCodes.CREATED).json(post);
});
export const updatePostHandler = catchAsync(async (req, res) => {
  const post = await updatePostService(req);
  res.status(StatusCodes.OK).json(post);
});
export const bulkUpdatePostsHandler = catchAsync(async (req, res) => {
  const posts = await bulkUpdatePostService(req);
  res.status(StatusCodes.OK).json(posts);
});
export const deletePostHandler = catchAsync(async (req, res) => {
  await deletePostService(req);
  res.status(StatusCodes.NO_CONTENT).json(null);
});
export const deleteManyPostsHandler = catchAsync(async (req, res) => {
  await deleteManyPostService();
  res.status(StatusCodes.NO_CONTENT).json(null);
});
