import { Link } from 'react-router-dom';
import PostList from '@Components/PostList/PostList';
import { useNavigate } from 'react-router-dom';
import { useGetAllPosts } from '@ApiService/Requests/usePosts';
import Post from '@Components/Post/Post';
import classes from './Posts.module.scss';

const Posts = () => {
  const navigate = useNavigate();
  const { posts } = useGetAllPosts();

  return (
    <div className={classes.postsContainer}>
      <Link to='/PostEditForm'>Create post</Link>
      {posts?.map((post) => (
        <Post key={post.id} onClick={() => navigate(`/PostEditForm/${post.id}`)} post={post} />
      ))}
    </div>
  );
};

export default Posts;
