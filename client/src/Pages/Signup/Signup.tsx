import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import RtlProvider from '@Utils/RtlProvider';
import PasswordInput from '@Components/PasswordInput';
import FormikInput from '@Components/FormikInput/FormikInput';
import {
  yupFirstName,
  yupLastName,
  yupEmail,
  yupPhoneNumber,
  yupPassword,
  yupPasswordConfirm,
} from '@Utils/yupValidations';
import { ISignupRequest } from '@ApiService/Interfaces/IUser';
import { object } from 'yup';
import { useAuth } from '@ApiService/Requests/useAuth';

const SignUp = () => {
  const { signupUser } = useAuth();

  const initialValues: ISignupRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = object().shape({
    firstName: yupFirstName,
    lastName: yupLastName,
    email: yupEmail,
    phoneNumber: yupPhoneNumber,
    password: yupPassword,
    passwordConfirm: yupPasswordConfirm,
  });

  const onSubmit = (values: ISignupRequest) => {
    signupUser({ ...values, phoneNumber: values.phoneNumber.replace('-', '') });
  };

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
          הרשמה{' '}
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
                  name='firstName'
                  label='שם פרטי'
                  type='name'
                  autoComplete='given-name'
                  autoFocus
                />

                <FormikInput
                  formik={formik}
                  name='lastName'
                  label='שם משפחה'
                  type='name'
                  autoComplete='family-name'
                />

                <FormikInput
                  formik={formik}
                  name='phoneNumber'
                  label="מס' טלפון"
                  placeholder='050-0000000'
                  type='tel'
                  autoComplete='tel-national'
                  style={{ direction: 'ltr' }}
                />

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
                  autoComplete='new-password'
                />

                <PasswordInput
                  formik={formik}
                  name='passwordConfirm'
                  label='אימות סיסמה'
                  autoComplete='new-password'
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formik.isValid}
                >
                  הרשם
                </Button>
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <Button href='Login' variant='text'>
                      יש לך חשבון? התחבר
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
    </Container>
  );
};

export default SignUp;
