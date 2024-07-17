import { Link } from 'react-router-dom';
import PostList from '@Components/PostList/PostList';
import classes from './Posts.module.scss';

const Posts = () => {
  return (
    <div className={classes.postsContainer}>
      <Link to='/PostEditForm'>Create post</Link>
      <PostList />
    </div>
  );
};

export default Posts;
