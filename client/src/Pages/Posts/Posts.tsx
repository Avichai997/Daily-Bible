import { Link } from 'react-router-dom';
import { useGetAllPosts } from '@ApiService/Requests/usePosts';
import Post from '@Components/Post/Post';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import classes from './Posts.module.scss';

const Posts = () => {
  const { posts } = useGetAllPosts();

  return (
    <div className={classes.postsContainer}>
      <Link to='/PostEditForm'>
        <IconButton className={classes.addPostBtn}>
          <Add />
          העלה פוסט חדש
        </IconButton>
      </Link>
      {posts
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
