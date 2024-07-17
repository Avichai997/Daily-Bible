import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

export interface IPostComments {
  comments: { comment: string; user: string }[];
}

const PostComments = ({ comments: initialComments }: IPostComments) => {
  const [showTextbox, setShowTextbox] = useState(false);
  const [newComment, setNewComment] = useState('');
  const location = useLocation();
  interface ILocationState {
    comments: Array<{ user: string; comment: string }>;
  }
  //const comments = (location.state as ILocationState)?.comments ?? [];
  const comments = initialComments;
  const params = useParams();
  const { postId } = params;
  const handleAddCommentClick = () => {
    setShowTextbox(!showTextbox);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  // Placeholder for the actual save function
  const saveCommentToDatabase = async (comment: string) => {
    const user = 'User'; // get user from context
    try {
      const newComment = { comment, user };
      console.log('comments:', comments);
      console.log('postId:', postId);
      const response = await axios.patch(
        `http://localhost:5000/posts/${postId}/comments/`,
        { comments: [...comments, newComment] }, // Spread the existing comments and add the new one

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      comments.push(newComment);
      console.log('Comment saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving comment:', error);
    }
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
