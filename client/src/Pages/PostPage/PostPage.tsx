import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '@Components/Post/Post';
import { IPost } from '@ApiService/Interfaces/IPost';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>();
  useEffect(() => {
    axios.get<IPost>(`http://localhost:5000/posts/${postId}`).then((response) => {
      setPost(response.data);
    });
  }, [postId]);

  return <div>{post && <Post post={post} title='Post' onRemoveCbk={() => {}} />}</div>;
};
export default PostPage;
