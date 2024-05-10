import { useState, useEffect } from 'react';

type Preview = string | ArrayBuffer | null;
interface IUploadImage {
  file: File | string;
}

const UploadImage = ({ file }: IUploadImage) => {
  const [preview, setPreview] = useState<Preview>(null);

  useEffect(() => {
    if (typeof file === 'string') {
      setPreview(null);

      return;
    }

    // preview image in element avatar after upload image
    if (file instanceof File) {
      const render = new FileReader();
      render.readAsDataURL(file as File);
      render.onload = () => setPreview(render.result);
    }
  }, [file, preview, setPreview]);

  // Checking if a user has uploaded an image to change or display the image from Mongo
  const existImage = () => {
    if (!preview && typeof file !== 'string') return undefined;

    return preview
      ? (preview as string)
      : typeof file === 'string' && file.includes('http')
        ? file
        : (`${import.meta.env.VITE_API_URL}/img/users/${file}` as string);
  };

  return <img src={existImage()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
};

export default UploadImage;
