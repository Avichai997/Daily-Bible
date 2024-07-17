import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { userInfo } from 'os';
import PostComments from '../PostComments/PostComments';
import axios from 'axios';

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
  const onDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${post._id}`);
    } catch (error) {
      console.error(error);
    }
    alert('Post deleted');
    navigate(-1);
  };

  return (
    <div className='post'>
      <button onClick={() => navigate(-1)}>חזור</button>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <img style={{ maxWidth: '300px' }} src={post.photo} />
      {true ? (
        <>
          <button
            onClick={() => {
              navigate(`/editpost/${post._id}`);
            }}
          >
            עריכה
          </button>
          <button onClick={onDeleteClick}>מחיקה</button>
        </>
      ) : (
        <></>
      )}
      <PostComments comments={post.comments} />
    </div>
  );
};

export default Post;
