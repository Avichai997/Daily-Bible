import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { VpnKeyOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import PasswordInput from '@Components/PasswordInput';
import { yupPassword, yupPasswordConfirm } from '@Utils/yupValidations';
import Copyright from '@Components/Copyright';
import RtlProvider from '@Utils/RtlProvider';
import { useAuth } from '@ApiService/Requests/useAuth';
import { IUpdateMyPasswordRequest } from '@ApiService/Interfaces/IUser';
import { object } from 'yup';

const UpdatePassword = () => {
  const { updateMyPassword } = useAuth();

  const initialValues = {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = object().shape({
    currentPassword: yupPassword,
    password: yupPassword,
    passwordConfirm: yupPasswordConfirm,
  });

  const onSubmit = (values: IUpdateMyPasswordRequest) => {
    updateMyPassword({ ...values });
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
            עדכון סיסמה
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
                    name='currentPassword'
                    label='סיסמה נוכחית'
                    autoComplete='current-password'
                  />

                  <PasswordInput
                    formik={formik}
                    name='password'
                    label='סיסמה חדשה'
                    autoComplete='new-password'
                    autoFocus
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
                    עדכון
                  </Button>
                </RtlProvider>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
};

export default UpdatePassword;
