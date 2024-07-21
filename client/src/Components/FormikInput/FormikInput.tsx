import { SxProps, TextField } from '@mui/material';
import { ErrorMessage, Field, FormikProps } from 'formik';

export interface IFormikInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  name: string;
  required?: boolean;
  variant?: string;
  label: string;
  autoFocus?: boolean;
  placeholder?: string;
  type: string;
  autoComplete: string;
  style?: SxProps;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormikInput = ({
  formik,
  name,
  required = true,
  variant = 'outlined',
  label,
  autoFocus = false,
  placeholder = label,
  type,
  autoComplete,
  style,
  disabled = false,
  multiline = false,
  rows = 1,
}: IFormikInput) => {
  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      fullWidth
      error={formik.errors[name] && formik.touched[name]}
      helperText={<ErrorMessage name={name} />}
      required={required}
      margin='normal'
      variant={variant}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      style={style}
      disabled={!!disabled}
      multiline={multiline}
      rows={rows}
    />
  );
};

export default FormikInput;
