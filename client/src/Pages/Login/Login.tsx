import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import RtlProvider from '@Utils/RtlProvider';
import Copyright from '@Components/Copyright';
import * as Yup from 'yup';
import { yupEmail, yupPassword } from '@Utils/yupValidations';
import PasswordInput from '@Components/PasswordInput';
import { useAuth } from '@ApiService/Requests/useAuth';
import FormikInput from '@Components/FormikInput/FormikInput';
import { ILoginRequest } from '@ApiService/Interfaces/IUser';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const { loginUser } = useAuth();

  const initialValues: ILoginRequest = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: yupEmail,
    password: yupPassword,
  });

  const handleCallbackResponse = (response: any) => {
    loginUser({
        email: (jwtDecode(response.credential) as any).email,
        password: response.credential
      }, 'loginWithGgl');
  }

  // init google, run once.
  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "1057711145390-cnoc7l10m6nv9upik18p7olmcn44hn87.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('signInWithGgl'), {
        theme: 'outline',
        size: 'large'
      }
    );

    // @ts-ignore
    google.accounts.id.prompt();
  }, []);

  const onSubmit = (values: ILoginRequest) => loginUser(values);

  return (
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
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          התחבר
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form noValidate>
              <RtlProvider>
                <FormikInput
                  formik={formik}
                  name='email'
                  label='כתובת אימייל'
                  type='email'
                  autoComplete='email'
                  style={{ direction: 'ltr' }}
                />

                <PasswordInput
                  formik={formik}
                  name='password'
                  label='סיסמה'
                  autoComplete='current-password'
                />

                <FormControlLabel control={<Checkbox defaultChecked />} label='זכור אותי' />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formik.isValid}
                >
                  התחבר
                </Button>
                <div id="signInWithGgl" style={{display: 'flex', justifyContent: 'center'}}/>
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <Button href='/ForgotPassword' variant='text'>
                      שכחת את הסיסמה?
                    </Button>
                  </Grid>
                  <Grid>
                    <Button href='signup' variant='text'>
                      פתח חשבון
                    </Button>
                  </Grid>
                  <Grid>
                    <Button href='/' variant='text'>
                      דף הבית
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
  );
};

export default Login;
