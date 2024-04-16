import { Link, SxProps, Theme, Typography } from '@mui/material';

interface ICopyright {
  sx?: SxProps<Theme> | undefined;
}

const Copyright = ({ sx }: ICopyright) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' dir='ltr' sx={sx}>
      {'Copyright © '}
      <Link
        color='inherit'
        href='https://www.linkedin.com/in/avichai-iluz-46ba51130/'
        target='blank'
      >
        Daily Bible
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Copyright;
