/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { IPost, PostComment } from '@ApiService/Interfaces/IPost';
import { useUser } from '@ApiService/Requests/useUser';
import { usePostCRUD } from '@ApiService/Requests/usePosts';
import { Avatar, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { VITE_API_URL } from '@Utils/Environment';
import { USER_QUERY_KEY } from '@CommonConstants';
import RtlProvider from '@Utils/RtlProvider';
import classes from './PostComments.module.scss';

type PostCommentsProps = {
  post: IPost;
};

const PostComments = ({ post }: PostCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState('');
  const { comments } = post;

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleEditedCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedComment(e.target.value);
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
    const updatedComments: IPost['comments'] = [...(post.comments || []), newCommentObject];

    await updatePost(post.id, {
      comments: updatedComments,
    });
    setNewComment('');
  };

  const handleEditComment = (commentId: string, currentComment: string) => {
    setEditingCommentId(commentId);
    setEditedComment(currentComment);
  };

  const handleSaveEditedComment = async () => {
    if (!post?.id || !user?.id || !editingCommentId) return;
    const updatedComments: IPost['comments'] = post.comments.map((comment) => {
      if (comment._id === editingCommentId) {
        return { ...comment, comment: editedComment };
      }

      return comment;
    });

    updatePost(post.id, {
      comments: updatedComments,
    });
    setEditingCommentId(null);
    setEditedComment('');
  };

  const handleDiscardEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!post?.id || !user?.id) return;
    setEditingCommentId(null);
    const updatedComments = post.comments.filter((comment) => comment._id !== commentId);

    updatePost(post.id, {
      comments: updatedComments,
    });
  };

  return (
    <div className={classes.comments}>
      תגובות:
      {comments.map(({ _id, comment, user: commentUser, createdAt }) => (
        <div key={_id} className={classes.comment}>
          {typeof commentUser === 'object' && (
            <>
              <Avatar
                sx={{ marginLeft: 2 }}
                src={`${VITE_API_URL}/img/${USER_QUERY_KEY}/${commentUser.photo}`}
              />
              <div className={classes.commentDetails}>
                <div>{`${commentUser.firstName} ${commentUser.lastName}`}</div>
                {editingCommentId === _id ? (
                  <div className={classes.editComment}>
                    <TextField
                      variant='standard'
                      value={editedComment}
                      onChange={handleEditedCommentChange}
                      fullWidth
                    />
                    <div className={classes.editActions}>
                      <Button variant='contained' color='primary' onClick={handleSaveEditedComment}>
                        שמור
                      </Button>
                      <Button variant='text' color='secondary' onClick={handleDiscardEdit}>
                        בטל
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={classes.commentText}>
                    <div>{comment}</div>
                    <div>{new Date(createdAt).toLocaleString().replace(',', '')}</div>
                  </div>
                )}
              </div>
              {commentUser.id === user?.id && (
                <div className={classes.commentActions}>
                  <IconButton color='primary' onClick={() => handleEditComment(_id!, comment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='secondary' onClick={() => handleDeleteComment(_id!)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </>
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
            disabled={!!editingCommentId}
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.commentBtn}
            onClick={handleSaveComment}
            disabled={!!editingCommentId}
          >
            הגב
          </Button>
        </div>
      </RtlProvider>
    </div>
  );
};

export default PostComments;
