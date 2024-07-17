import { useNavigate } from 'react-router-dom';
import { IPost } from '@ApiService/Interfaces/IPost';
import PostComments from '../PostComments/PostComments';

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
          navigate(`/editPost/${post.id}`);
        }}
      >
        Edit
      </button>
      <PostComments comments={post.comments} />
    </div>
  );
};

export default Post;
