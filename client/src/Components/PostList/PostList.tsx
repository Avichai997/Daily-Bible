import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import { useNavigate } from 'react-router-dom';

interface PostData {
  _id: string;
  title: string;
  content: string;
  owner: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get<PostData[]>('http://localhost:5000/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => navigate(`/posts/${post._id}`)}
          style={{ cursor: 'pointer' }}
        >
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default PostList;
