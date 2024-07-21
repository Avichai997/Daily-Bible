// import React, { ChangeEventHandler, useEffect, useState } from 'react';
// import axios from 'axios';
// import { IPost } from '@ApiService/Interfaces/IPost';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditPost.scss';
// import uploadImg, { IUploadResponse } from '@ApiService/uploadFile/uploadFileService';
// import { ToastError, ToastSuccess } from '@Components/Toastify/Toasts';
// import { useGetAllPosts } from '@ApiService/Requests/usePosts';

// const EditPost = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const postId = params?.postId;
//   const { posts } = useGetAllPosts();
//   const post = posts?.find((post) => post.id === postId);

//   // const [post, setPost] = useState<IPost>();
//   const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
//   const [photo, setPhoto] = useState(''); // '../server/public/img/${USER_QUERY_KEY}/default.jpg'
//   const authorId = '6681306d4cd70a8f3428ddf2'; // useContext(UserContext).user._id;

//   useEffect(() => {
//     if (post?.photo) {
//       setPhotoPreviewUrl(post.photo);
//       setPhoto(post.photo);
//     }
//   }, [post]);

//   const handlePhotoChange: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
//     e.preventDefault();
//     const reader = new FileReader();
//     const file = e?.target?.files?.[0];
//     reader.onloadend = () => {
//       if (reader?.result) setPhotoPreviewUrl(String(reader.result));
//     };
//     setPhoto(file);
//     reader.readAsDataURL(file);
//   };

//   const handleEditPost = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();
//     const title = (document.querySelector('textArea[name="titleForm"]') as HTMLInputElement).value;
//     const content = (document.querySelector('textArea[name="contentForm"]') as HTMLTextAreaElement)
//       .value;
//     const imgFile = (document.querySelector('input[name="photoForm"]') as HTMLInputElement)
//       .files?.[0];

//     if (imgFile) {
//       const uploadResponse: IUploadResponse = await uploadImg(imgFile);
//       setPhotoPreviewUrl(uploadResponse);
//       setPhoto(uploadResponse);
//     }
//     if (title === '' || content === '') {
//       alert('Please fill all fields');

//       return;
//     }
//     const post = {
//       title,
//       content,
//       photo,
//       authorId,
//     }; // TODO: add authorization config
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization:
//           'JWT dyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxMzA2ZDRjZDcwYThmMzQyOGRkZjIiLCJpYXQiOjE3MTk3NDI1OTcsImV4cCI6MTcyNzUxODU5N30.FB4P-o6s8nlDedipZMCtCajzSG0_SPiDHmN2W4SEdkM',
//       },
//     };
//     const url =
//       postId === '' ? 'http://localhost:5000/posts' : `http://localhost:5000/posts/${postId}`;
//     const method = postId ? axios.post : axios.patch;
//     method(url, post, config)
//       .then(() => {
//         ToastSuccess(postId === '' ? 'Post added' : 'Post updated');
//         navigate(-1); // TODO: change to navigate to post list handler
//       })
//       .catch((error) => {
//         ToastError(error);
//       });
//   };

//   return (
//     <div style={{ width: '20%', float: 'left', display: 'flex', flexDirection: 'column' }}>
//       <button onClick={() => navigate(-1)}>חזור</button>
//       <h1>פירוש חדש</h1>
//       <form>
//         כותרת:
//         <textarea
//           style={{ minWidth: '100px' }}
//           name='titleForm'
//           placeholder='כותרת'
//           defaultValue={post?.title}
//           onInput={(e) => {
//             e.currentTarget.style.width = `${(e.target.value.length + 1) * 8}px`;
//           }}
//         />
//         תוכן:
//         <textarea
//           style={{ minWidth: '100px' }}
//           name='contentForm'
//           placeholder='תוכן'
//           defaultValue={post?.content}
//           onInput={(e) => {
//             e.currentTarget.style.width = `${(e.target.value.length + 1) * 8}px`;
//           }}
//         />
//         להוסיף תמונה?
//         {photoPreviewUrl && (
//           <img
//             src={photoPreviewUrl}
//             alt='preview'
//             style={{ maxWidth: '100px' }}
//             className='img-fluid'
//           />
//         )}
//         <input
//           type='file'
//           name='photoForm'
//           onChange={handlePhotoChange}
//           defaultValue={post?.photo}
//         />
//       </form>
//       <button onClick={handleEditPost}>שמירה</button>
//     </div>
//   );
// };

// export default EditPost;
