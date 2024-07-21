import { Schema, model } from 'mongoose';
import { IPosts } from '@Interfaces/IPosts';

// Define the CommentSchema
const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'חובה להזין תוכן לתגובה'],
      minlength: 2,
      maxlength: 100,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'חובה להזין id לעורך הפוסט'],
    },
    createdAt: {
      type: Date,
      required: [true, 'חובה להזין id לעורך הפוסט'],
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

const postSchema = new Schema<IPosts>(
  {
    title: {
      type: String,
      required: [true, 'חובה להזין כותרת לפוסט'],
      minlength: 2,
      maxlength: 100,
    },
    photo: { type: String, default: 'default.jpg' },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'חובה להזין id לעורך הפוסט'],
    },
    content: {
      type: String,
      required: [true, 'חובה להזין תוכן לפוסט'],
      minlength: 2,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = model<IPosts>('Post', postSchema);

export default Post;
