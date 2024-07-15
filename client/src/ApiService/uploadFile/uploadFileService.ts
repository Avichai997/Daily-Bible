import apiClient from './apiClient';

interface IUploadResponse {
  url: string;
}
const uploadImg = async (photo: File) => {
  return new Promise<string>((resolve, reject) => {
    console.log('Uploading Image: ' + photo);
    const formData = new FormData();
    if (photo) {
      formData.append('file', photo);
      apiClient
        .post<IUploadResponse>('file?file=123.webp', formData, {
          headers: {
            'Content-Type': 'image/jpeg',
          },
        })
        .then((res) => {
          console.log('Upload successful:', res);
          resolve(res.data.url);
        })
        .catch((err) => {
          console.error('Upload failed:', err);
          reject(err);
        });
    }
  });
};

// const uploadImg = async (photo: File) => {
//   return new Promise<string>((resolve, reject) => {
//     console.log('Upload Image..' + photo);
//     const formData = new FormData();
//     if (photo) {
//       formData.append('file', photo);
//       apiClient
//         .post<IUploadResponse>('file?file=123.webp', formData, {
//           headers: {
//             'Content-Type': 'image/jpeg',
//           },
//         })
//         .then((res) => {
//           console.log(res);
//           resolve(res.data.url);
//         })
//         .catch((err) => {
//           console.log(err);
//           reject(err);
//         });
//     }
//   });
// };

export default uploadImg;
