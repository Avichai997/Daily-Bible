// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetAllPosts } from '@ApiService/Requests/usePosts';
// import { useUser } from '@ApiService/Requests/useUser';
// import PostComments from '../PostComments/PostComments';

// const Post = () => {
//   const { user } = useUser();
//   const params = useParams();
//   const postId = params?.postId;

//   const { posts } = useGetAllPosts();
//   const post = posts?.find((post) => post.id === postId);

//   if (!post) return <>No post found</>;

//   const { id, title, content, authorId, photo, comments } = post;

//   const navigate = useNavigate();
//   const onDeleteClick = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/posts/${post._id}`);
//     } catch (error) {
//       alert('Error deleting post');
//     }
//     alert('Post deleted');
//     navigate(-1);
//   };

//   return (
//     <div className='post'>
//       <button onClick={() => navigate(-1)}>חזור</button>
//       <h1>{title}</h1>
//       <p>{content}</p>
//       <img style={{ maxWidth: '300px' }} src={photo} />

//       {user?.id === authorId ? (
//         <>
//           <button
//             onClick={() => {
//               navigate(`/editpost/${id}`);
//             }}
//           >
//             עריכה
//           </button>
//           <button onClick={onDeleteClick}>מחיקה</button>
//         </>
//       ) : (
//         <></>
//       )}
//       <PostComments comments={comments} />
//     </div>
//   );
// };

// export default Post;
