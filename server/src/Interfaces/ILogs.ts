import { Logs } from '@Models/logModel';
import { User } from '@Models/userModel';
import { Document, ObjectId } from 'mongoose';

export interface ILogs extends Logs {
  _id: string | ObjectId;
  user: User;
}

export type currentLog = Document<unknown, unknown, ILogs> & ILogs & { _id: ObjectId };
