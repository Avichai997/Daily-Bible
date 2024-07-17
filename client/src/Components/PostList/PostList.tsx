import { useNavigate } from 'react-router-dom';
import { useGetAllPosts } from '@ApiService/Requests/usePosts';

const PostList = () => {
  const navigate = useNavigate();
  const { posts } = useGetAllPosts();

  return (
    <div>
      {posts?.map((post) => (
        <div
          key={post.id}
          // onClick={() => navigate(`/posts/${post.id}`)}
          onClick={() => navigate(`/PostEditForm/${post.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default PostList;
