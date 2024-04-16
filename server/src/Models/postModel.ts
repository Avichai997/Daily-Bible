import { Schema, model } from 'mongoose';
import IPost from '@Interfaces/IPost';

const postSchema = new Schema<IPost>(
  {
    name: {
      type: String,
      required: [true, 'חובה להזין שם קטגוריה'],
      trim: true,
      maxlength: [40, 'שם לקוח צריך להיות קצר מ-40 תווים'],
      minlength: [2, 'שם לקוח צריך להיות ארוך מ-2 תווים'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = model<IPost>('Post', postSchema);

export default Post;
