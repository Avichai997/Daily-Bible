import { Link, useNavigate } from 'react-router-dom';
import { useGetAllPosts } from '@ApiService/Requests/usePosts';
import Post from '@Components/Post/Post';
import classes from './Posts.module.scss';

const Posts = () => {
  const { posts } = useGetAllPosts();

  return (
    <div className={classes.postsContainer}>
      <Link to='/PostEditForm'>Create post</Link>
      {posts
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
