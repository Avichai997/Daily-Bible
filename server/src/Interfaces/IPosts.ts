import { Document, ObjectId } from 'mongoose';
import { IUsers } from './IUsers'; // Import the IUser interface

export interface IPosts {
  isNew: boolean;

  _id: string | ObjectId;
  title: string;
  content: string;
  photo: string;
  authorId: IUsers['_id'];
  createdAt: Date | number;

  active: boolean;
}

export type currentPost = Document<unknown, unknown, IPosts> & IPosts & { _id: ObjectId };
