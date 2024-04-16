import { SxProps } from '@mui/material';

export const fontSizeLabel = {
  fontSize: '22px',
  color: 'var(--color-black)',
};
export const fontSizeLabelOuter = {
  fontSize: '18px',
  color: 'var(--color-black)',
};

export const sxFormikInput = (label: string | undefined): SxProps => {
  return {
    '& .MuiFormHelperText-root': {
      display: !label ? 'none' : 'initial',
      color: 'var(--color-red)',
      height: '0px',
      marginTop: 0,
    },
    '& .MuiFormLabel-asterisk': {
      color: 'var(--color-red)',
      display: !label ? 'none' : 'initial',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      display: 'none',
    },
    '& .MuiInputBase-multiline textarea': {
      textAlign: 'left',
      padding: '0px 5px',
    },
  };
};
