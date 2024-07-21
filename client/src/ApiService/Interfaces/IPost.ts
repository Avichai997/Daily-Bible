import { IUser } from './IUser';

type PopulatedUser = Pick<IUser, '_id' | 'id' | 'firstName' | 'lastName' | 'photo'>;

export type PostComment = {
  comment: string;
  user: PopulatedUser | string;
  createdAt: string;
};
export interface IPost {
  id?: string;
  authorId: PopulatedUser;
  title: string;
  content: string;
  photo: string;
  comments: PostComment[];
  imageFieldName?: 'photo';
  createdAt: string;
  updatedAt: string;
}

export type PostFormValues = Pick<IPost, 'authorId' | 'title' | 'content' | 'photo'>;

export interface ICreatePostRequest extends FormData {
  authorId: string;
  title: string;
  content: string;
  photo: File;
}

export interface IUpdatePostRequest extends FormData {
  title: string;
  content: string;
  photo: File;
}
