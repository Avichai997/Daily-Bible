import { useNavigate } from 'react-router-dom';
import { useUser } from '@ApiService/Requests/useUser';
import { IUserPost } from '@ApiService/Interfaces/IPost';
import { VITE_API_URL } from '@Utils/Environment';
import { Avatar, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import classes from './Post.module.scss';

type PostProps = {
  post: IUserPost;
};
const Post = ({ post }: PostProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const postUser = post?.authorId;
  const isEditable = user?.id === postUser?.id;

  return (
    <div className={classes.container}>
      <div className={classes.title}>{post.title}</div>

      {postUser && (
        <div className={classes.user}>
          <Avatar src={`${VITE_API_URL}/img/users/${postUser.photo}`} className={classes.avatar} />
          <div className={classes.postDetails}>
            <div className={classes.userName}>{`${postUser.firstName} ${postUser.lastName}`}</div>
            <div className={classes.postTime}>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>
      )}

      <div className={classes.content}>{post.content}</div>
      <Button
        variant='text'
        className={classes.readMore}
        onClick={() => navigate(`/PostEditForm/${post.id}`)}
      >
        להמשך קריאה
      </Button>

      {isEditable && (
        <IconButton
          className={classes.editPost}
          onClick={() => navigate(`/PostEditForm/${post.id}`)}
        >
          <EditIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Post;
