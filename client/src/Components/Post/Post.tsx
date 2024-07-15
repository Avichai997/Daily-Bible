import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { userInfo } from 'os';
import PostComments from '../PostComments/PostComments';
export interface IPost {
  _id: string;
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
interface IProps {
  post: IPost;
  title: string;
  onRemoveCbk: () => void;
}

const Post = ({ post }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className='post'>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <img style={{ maxWidth: '300px' }} src={post.photo} />
      <button
        onClick={() => {
          navigate(`/editpost/${post._id}`);
        }}
      >
        Edit
      </button>
      <PostComments comments={post.comments} />
    </div>
  );
};

export default Post;
