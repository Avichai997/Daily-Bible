import { useState, useEffect } from 'react';
import { Preview } from '@/types/Profile.model';

const UploadImage: React.FC<{ file: File | string }> = ({ file }) => {
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
      render.onload = () => {
        setPreview((prev) => render.result);
      };
    }
  }, [file, preview, setPreview]);

  // Checking if a user has uploaded an image to change or display the image from Mongo
  const existImage = () => {
    if (!preview && typeof file !== 'string') return;

    return preview
      ? (preview as string)
      : typeof file === 'string' && file.includes('http')
        ? file
        : (`${import.meta.env.VITE_API_URL}/img/users/${file}` as string);
  };

  return <img src={existImage()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
};

export default UploadImage;
