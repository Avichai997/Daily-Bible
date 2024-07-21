import { Avatar } from '@mui/material';
import UploadFile from '@Components/UploadFile/UploadFile';
import { FormikErrors } from 'formik';
import UploadImage from './UploadImage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormikValues<T> = T & {
  photo: File | string;
};

interface IProfile {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<FormikValues<unknown>>>;
  values: FormikValues<unknown>;
  errors: boolean | '' | undefined;
  helperText: JSX.Element;
  apiUrl?: string | undefined;
}

const ImgProfile = ({ setFieldValue, values, errors, helperText, apiUrl }: IProfile) => {
  const { photo } = values;
  const file = typeof photo === 'string' ? `${apiUrl}${photo}` : photo;

  return (
    <>
      <Avatar sx={{ width: 150, height: 150, m: 1 }}>{file && <UploadImage file={file} />}</Avatar>
      <UploadFile
        onChange={(event) => {
          if (event.target.files) setFieldValue('photo', event.target?.files[0], true);
        }}
        onClickRemove={() => setFieldValue('photo', 'default.jpg')}
      />
      {/* eslint-disable-next-line no-warning-comments */}
      {/* TODO: test if error really show */}
      <div style={{ color: 'red', fontSize: '.7rem' }}>{errors && helperText}</div>
    </>
  );
};

export default ImgProfile;
