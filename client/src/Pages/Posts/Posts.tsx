import PostListHandler from '@Components/PostListHandler/PostListHandler';
import { Link } from 'react-router-dom';
import classes from './Posts.module.scss';

const Posts = () => {
  return (
    <div className={classes.postsContainer}>
      <Link to='/editPost'>Edit Post</Link>
      <PostListHandler />
    </div>
  );
};

export default Posts;
