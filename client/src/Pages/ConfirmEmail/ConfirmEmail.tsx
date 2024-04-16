import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';

import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useUser } from '@ApiService/Requests/useUser';
import { useAuth } from '@ApiService/Requests/useAuth';
import { axiosClient } from '@Utils/ReactQueryConfig';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
};

const ConfirmEmail = () => {
  const params = useParams();
  const { user } = useUser();
  const { confirmMyEmail } = useAuth();
  const isMutating = useIsMutating();
  const isWaitingToResponse = !!isMutating;

  useEffect(() => {
    if (
      axiosClient.defaults.headers.post['X-CSRF-Token'] &&
      params.email &&
      params.token &&
      !user?.emailVerified
    )
      confirmMyEmail({ email: params.email, token: params.token });
  }, [confirmMyEmail, params, user?.emailVerified]);

  return (
    <Container component='main'>
      <Box
        sx={{
          marginTop: 25,
          ...boxStyle,
        }}
      >
        {isWaitingToResponse ? (
          <Box sx={boxStyle}>
            <Typography variant='h3' gutterBottom>
              מאמת את כתובת המייל שלך...
            </Typography>
          </Box>
        ) : user?.emailVerified ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <CheckCircleOutline color='success' sx={{ fontSize: 100 }} />
            <Typography variant='h3' gutterBottom sx={{ color: 'green' }}>
              אימות מייל בוצע בהצלחה!
            </Typography>
            <Button href='/' variant='contained' sx={{ fontSize: 20 }} color='success'>
              לדשבורדים
            </Button>
            <Button href='/Admin' variant='contained' sx={{ fontSize: 20 }} color='success'>
              לדף Admin
            </Button>
          </Box>
        ) : (
          <Box sx={boxStyle}>
            <ErrorOutline color='error' sx={{ fontSize: 100 }} />
            <Typography variant='h3' gutterBottom color='error'>
              כתובת המייל לא אומתה או שהאימות נכשל
            </Typography>
            <Button href='/' variant='contained' sx={{ fontSize: 20 }} color='error'>
              לדשבורדים
            </Button>
            <Button href='/login' variant='contained' sx={{ fontSize: 20 }} color='error'>
              התחבר
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ConfirmEmail;
