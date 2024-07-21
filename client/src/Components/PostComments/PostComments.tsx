import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IPost } from '@ApiService/Interfaces/IPost';
import { useUser } from '@ApiService/Requests/useUser';

const PostComments = (post: IPost) => {
  const [showTextbox, setShowTextbox] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { comments } = post;
  const handleAddCommentClick = () => {
    setShowTextbox(!showTextbox);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };
  const { user } = useUser();

  // Placeholder for the actual save function
  const saveCommentToDatabase = async (comment: string) => {
    try {
      const newComment = { comment, user: user?.id };

      const response = await axios.patch(
        `http://localhost:5000/posts/${post?.id || post?._id}/comments/`,
        { comments: [...comments, newComment] }, // Spread the existing comments and add the new one

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      comments.push(newComment);
    } catch (error) {}
  };

  const handleSaveComment = async () => {
    await saveCommentToDatabase(newComment);
    setShowTextbox(false); // Hide the textbox after saving
    setNewComment(''); // Reset the comment input
  };

  return (
    <div>
      <button onClick={handleAddCommentClick}>הוסף תגובה</button>
      {showTextbox && (
        <div>
          <input type='text' value={newComment} onChange={handleCommentChange} />
          <button onClick={handleSaveComment}>שלח</button>
        </div>
      )}
      {comments
        ?.slice()
        .reverse()
        .map((comment, index) => (
          <div key={index}>
            <p>
              {comment.user}:{comment.comment}
            </p>
          </div>
        ))}
    </div>
  );
};

export default PostComments;
