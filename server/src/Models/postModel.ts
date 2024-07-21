/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
// import AppError from '@Utils/AppError';
import { /* currentPost, */ IPosts } from '@Interfaces/IPosts';
// import { TEN_MINUTES } from '@Utils/commonConstants';
// import { StatusCodes } from 'http-status-codes';

const postSchema = new Schema<IPosts>(
  {
    title: {
      type: String,
      required: [true, 'חובה להזין כותרת לפוסט'],
      minlength: 2,
      maxlength: 40,
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
      maxlength: 500,
    },
    comments: [
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
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual<IPosts>('posts', {
  //
  //
  //
  //
});

const Post = model<IPosts>('Post', postSchema);

export default Post;
