import { IUser } from './IUser';

export interface IPost {
  id?: string;
  authorId: Pick<IUser, '_id' | 'id' | 'firstName' | 'lastName' | 'photo'>;
  title: string;
  content: string;
  photo: string;
  comments?: {
    comment: string;
    user: string;
  }[];
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
