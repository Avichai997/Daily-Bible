import { Document, ObjectId } from 'mongoose';
import { IUsers } from './IUsers';

export interface IPosts {
  isNew: boolean;

  _id: string | ObjectId;
  title: string;
  content: string;
  photo: string;
  authorId: IUsers['_id'];
  comments: { comment: string; user: IUsers['_id'] }[];

  active: boolean;
}

export type currentPost = Document<unknown, unknown, IPosts> & IPosts & { _id: ObjectId };
