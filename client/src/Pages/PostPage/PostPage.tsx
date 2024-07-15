import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post, { IPost, IProps } from '../../Components/Post/Post';
import axios from 'axios';

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
