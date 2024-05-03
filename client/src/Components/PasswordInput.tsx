import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ErrorMessage, Field, FormikProps } from 'formik';

export interface IPasswordInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  name: string;
  label: string;
  autoComplete: string;
  autoFocus?: boolean;
}

export const PasswordInput = ({
  formik,
  name,
  label,
  autoComplete,
  autoFocus = false,
}: IPasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      fullWidth
      error={formik.errors[name] && formik.touched[name]}
      helperText={<ErrorMessage name={name} />}
      required
      variant='outlined'
      type={showPassword ? 'text' : 'password'}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      margin='normal'
      style={{ direction: 'ltr' }}
      InputProps={{
        componentsProps: {
          input: {
            style: { paddingLeft: '14px' },
          },
          root: {
            style: { padding: 0 },
          },
        },
        endAdornment: (
          <InputAdornment position='end' style={{ position: 'absolute', right: 0 }}>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(prev => !prev)}
              edge='end'
            >
              {formik.values[name] && (showPassword ? <VisibilityOff /> : <Visibility />)}
            </IconButton>
          </InputAdornment>
        ),
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        style: { paddingLeft: '14px' },
      }}
    />
  );
};

export default PasswordInput;
