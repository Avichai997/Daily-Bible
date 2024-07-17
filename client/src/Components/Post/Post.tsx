import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IPost } from '@ApiService/Interfaces/IPost';
import PostComments from '../PostComments/PostComments';

interface IProps {
  post: IPost;
  title: string;
}

const Post = ({ post }: IProps) => {
  const navigate = useNavigate();
  const onDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${post._id}`);
    } catch (error) {
      alert('Error deleting post');
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
              navigate(`/editpost/${post.id}`);
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
