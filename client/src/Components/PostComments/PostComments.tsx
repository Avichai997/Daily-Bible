import React, { useState } from 'react';
import { IPost, PostComment } from '@ApiService/Interfaces/IPost';
import { useUser } from '@ApiService/Requests/useUser';
import { usePostCRUD } from '@ApiService/Requests/usePosts';
import { Avatar, Button, TextField } from '@mui/material';
import { VITE_API_URL } from '@Utils/Environment';
import { USER_QUERY_KEY } from '@CommonConstants';
import classes from './PostComments.module.scss';
import RtlProvider from '@Utils/RtlProvider';

type PostCommentsProps = {
  post: IPost;
};

const PostComments = ({ post }: PostCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const { comments } = post;

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };
  const { user } = useUser();
  const { updatePost } = usePostCRUD();

  const handleSaveComment = async () => {
    if (!post?.id || !user?.id) return;
    const newCommentObject: PostComment = {
      comment: newComment,
      user: user.id,
      createdAt: new Date().toISOString(),
    };
    const comments: IPost['comments'] = structuredClone(post.comments || []);
    comments.push(newCommentObject);

    updatePost(post.id, {
      comments,
    });
    setNewComment('');
  };

  return (
    <div className={classes.comments}>
      תגובות:
      {comments.map(({ comment, user, createdAt }, index) => (
        <div key={index}>
          {typeof user === 'object' ? (
            <div className={classes.comment}>
              <Avatar
                sx={{
                  marginLeft: 2,
                }}
                src={`${VITE_API_URL}/img/${USER_QUERY_KEY}/${user.photo}`}
              />
              <div className={classes.commentDetails}>
                <p>{`${user.firstName} ${user.lastName}`}</p>

                <div className={classes.commentText}>
                  <p>{comment}</p>
                  <div>{new Date(createdAt).toLocaleString().replace(',', '')}</div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
      <RtlProvider>
        <div className={classes.addComment}>
          <TextField
            variant='standard'
            value={newComment}
            onChange={handleCommentChange}
            label='הוסף תגובה'
            fullWidth
            margin='normal'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.commentBtn}
            onClick={handleSaveComment}
          >
            הגב
          </Button>
        </div>
      </RtlProvider>
    </div>
  );
};

export default PostComments;
