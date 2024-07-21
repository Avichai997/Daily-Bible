import { useNavigate } from 'react-router-dom';
import { useUser } from '@ApiService/Requests/useUser';
import { IPost } from '@ApiService/Interfaces/IPost';
import { VITE_API_URL } from '@Utils/Environment';
import {
  Avatar,
  IconButton,
  IconButtonProps,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  styled,
} from '@mui/material';
import Card from '@mui/material/Card';

import { Edit, ExpandMore, Share, Favorite } from '@mui/icons-material';
import { useState } from 'react';
import { POSTS_QUERY_KEY, USER_QUERY_KEY } from '@CommonConstants';
import PostComments from '@Components/PostComments/PostComments';
// import classes from './Post.module.scss';

interface IExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreContainer = styled((props: IExpandMoreProps) => {
  const { expand, ...other } = props;

  return (
    <>
      <IconButton {...other} />
      <div
        // @ts-ignore
        onClick={props?.onClick}
        style={{
          cursor: 'pointer',
        }}
      >
        המשך קריאה
      </div>
    </>
  );
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type PostProps = {
  post: IPost;
};
const Post = ({ post }: PostProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const postUser = post?.authorId;
  const isEditable = user?.id === postUser?.id;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const imageSrc = `${VITE_API_URL}/img/${USER_QUERY_KEY}/${postUser.photo}`;

  return (
    <Card
      sx={{
        width: 600,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: 4,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              marginLeft: 2,
            }}
            src={imageSrc}
          />
        }
        action={
          isEditable ? (
            <IconButton>
              <Edit onClick={() => navigate(`/PostEditForm/${post.id}`)} />
            </IconButton>
          ) : (
            <></>
          )
        }
        title={`${postUser.firstName} ${postUser.lastName}`}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardMedia
        component='img'
        height='194'
        image={`${VITE_API_URL}/img/${POSTS_QUERY_KEY}/${post.photo}`}
      />
      <CardContent>
        <Typography variant='h5' color='text.secondary'>
          {post.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton> */}
        <ExpandMoreContainer expand={expanded} onClick={handleExpandClick}>
          <ExpandMore />
        </ExpandMoreContainer>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>{post.content}</CardContent>
        {user && <PostComments post={post} />}
      </Collapse>
    </Card>

    // <div className={classes.container}>
    //   <div className={classes.title}>{post.title}</div>

    //   {postUser && (
    //     <div className={classes.user}>
    //       <Avatar src={`${VITE_API_URL}/img/${USER_QUERY_KEY}/${postUser.photo}`} className={classes.avatar} />
    //       <div className={classes.postDetails}>
    //         <div className={classes.userName}>{`${postUser.firstName} ${postUser.lastName}`}</div>
    //         <div className={classes.postTime}>{new Date(post.createdAt).toLocaleString()}</div>
    //       </div>
    //     </div>
    //   )}

    //   <div className={classes.content}>{post.content}</div>
    //   <Button
    //     variant='text'
    //     className={classes.readMore}
    //     onClick={() => navigate(`/PostEditForm/${post.id}`)}
    //   >
    //     להמשך קריאה
    //   </Button>

    //   {isEditable && (
    //     <IconButton
    //       className={classes.editPost}
    //       onClick={() => navigate(`/PostEditForm/${post.id}`)}
    //     >
    //       <Edit />
    //     </IconButton>
    //   )}
    // </div>
  );
};

export default Post;
