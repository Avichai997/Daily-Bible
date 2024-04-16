import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import UploadImage from './UploadImage';
import { Profile } from '@/types/Profile.model';
import UploadFile from '@/components/UploadFile';

const ImgProfile: React.FC<Profile> = ({ setFieldValue, values, errors, helperText, apiUrl }) => {
  const { photo } = values;
  const file = typeof photo === 'string' ? `${apiUrl}${photo}` : photo;

  return (
    <>
      <Avatar sx={{ width: 150, height: 150, m: 1 }}>{file && <UploadImage file={file} />}</Avatar>

      <UploadFile
        onChange={(event: any) => {
          setFieldValue('photo', event.target.files[0], true);
        }}
        onClickRemove={(e: any) => {
          setFieldValue('photo', 'default.jpg');
        }}
      />

      {/* TODO: test if error really show */}
      <div style={{ color: 'red', fontSize: '.7rem' }}>{errors && helperText}</div>
    </>
  );
};

export default ImgProfile;
