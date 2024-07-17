export interface IPost {
  id?: string;
  authorId?: string;
  title: string;
  content: string;
  photo: string;
  comments?: {
    comment: string;
    user: string;
  }[];
  imageFieldName?: 'photo';
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
