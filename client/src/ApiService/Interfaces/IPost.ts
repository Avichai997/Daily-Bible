export interface IPost {
  id: string;
  authorId?: string;
  title: string;
  content: string;
  photo?: string;
  products?: string;
  comments?: Array<{
    comment: string;
    user: string;
  }>;
}
