import PostListHandler from '@Components/PostListHandler/PostListHandler';
import { Link } from 'react-router-dom';

const Posts = () => {
  return (
    <div>
      <Link to='/editPost'>Edit Post</Link>
      <PostListHandler />
    </div>
  );
};

export default Posts;
