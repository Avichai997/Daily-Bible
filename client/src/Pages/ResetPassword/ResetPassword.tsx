import { VpnKeyOff } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import PasswordInput from '@Components/PasswordInput';
import { yupPassword, yupPasswordConfirm } from '@Utils/yupValidations';
import Copyright from '@Components/Copyright';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/react-query/useAuth';
import RtlProvider from '@/utils/RtlProvider';

const ResetPassword = () => {
  const { resetMyPassword } = useAuth();
  const { temporaryToken } = useParams();

  const initialValues = {
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = Yup.object().shape({
    password: yupPassword,
    passwordConfirm: yupPasswordConfirm,
  });

  const onSubmit = (values: { password: string; passwordConfirm: string }, props: any) => {
    {
      temporaryToken &&
        resetMyPassword({
          temporaryToken,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
    }
  };

  return (
    <div className='App'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <VpnKeyOff />
          </Avatar>
          <Typography component='h1' variant='h5'>
            איפוס סיסמה
          </Typography>
          <Typography sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
            הזן סיסמה חדשה לחשבונך :
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form noValidate>
                <RtlProvider>
                  <PasswordInput
                    formik={formik}
                    name='password'
                    label='סיסמה חדשה'
                    autoComplete='new-password'
                  />

                  <PasswordInput
                    formik={formik}
                    name='passwordConfirm'
                    label='אימות סיסמה חדשה'
                    autoComplete='new-password'
                  />

                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!formik.isValid}
                  >
                    אפס סיסמה
                  </Button>
                  <Grid container justifyContent='space-between'>
                    <Grid>
                      <Button href='/Login' variant='text'>
                        התחברות
                      </Button>
                    </Grid>
                    <Grid>
                      <Button href='/ForgotPassword' variant='text'>
                        שחכתי סיסמה
                      </Button>
                    </Grid>
                  </Grid>
                </RtlProvider>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright />
      </Container>
    </div>
  );
};

export default ResetPassword;
