import { Link } from 'react-router-dom';
import Post from '../../Components/Post/Post';
import PostListHandler from '../../Components/PostListHandler/PostListHandler';

const Bible = () => {
  return (
    <div>
      <h1>Home Page for bible learn!</h1>
      <Link to='/editPost'>Edit Post</Link>
      <PostListHandler />
    </div>
  );
};

export default Bible;
