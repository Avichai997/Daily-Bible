import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { yupEmail } from '@Utils/yupValidations';
import { useAuth } from '@ApiService/Requests/useAuth';
import FormikInput from '@Components/FormikInput/FormikInput';
import Copyright from '@Components/Copyright';
import { KeyOff } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import RtlProvider from '@/utils/RtlProvider';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: yupEmail,
  });

  const onSubmit = (values: { email: string }, props: any) => {
    forgotPassword(values.email);
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
          <KeyOff />
        </Avatar>
        <Typography component='h1' variant='h5'>
          שכחתי סיסמה
        </Typography>

        <Typography sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
          שכחת את הסיסמה שלך?
          <br />
          הזן את כתובת האימייל איתה נרשמת ויישלח אליך מייל לאיפוס הסיסמה.
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

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formik.isValid}
                >
                  שלח לי מייל לאיפוס סיסמה
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Button href='/Login' variant='text'>
                      התחברות
                    </Button>
                  </Grid>
                  <Grid item />
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
export default ForgotPassword;
