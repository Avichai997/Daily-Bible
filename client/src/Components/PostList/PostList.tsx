import { useNavigate } from 'react-router-dom';
import { useGetAllPosts } from '@ApiService/Requests/usePosts';
import Post from '@Components/Post/Post';

const PostList = () => {
  const navigate = useNavigate();
  const { posts } = useGetAllPosts();

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} onClick={() => navigate(`/PostEditForm/${post.id}`)} post={post} />
      ))}
    </div>
  );
};

export default PostList;
