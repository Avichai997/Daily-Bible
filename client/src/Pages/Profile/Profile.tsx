import { Box, Button, Container, Typography } from '@mui/material';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import RtlProvider from '@Utils/RtlProvider';
import Copyright from '@Components/Copyright';
import ImgProfile from '@pages/Profile/ImgProfile';
import FormikInput from '@Components/FormikInput/FormikInput';
import * as Yup from 'yup';
import { useAuth } from '@ApiService/Requests/useAuth';
import { useUser } from '@ApiService/Requests/useUser';
import {
  yupFirstName,
  yupLastName,
  yupEmail,
  yupPhoneNumber,
  yupPhotoUpload,
} from '@Utils/yupValidations';
import { updatedDiff } from 'deep-object-diff';
import { UpdateProfile } from '@/types/Profile.model';
import parseGenericObject from '@/utils/parseGenericObject';

const Profile = () => {
  const { user } = useUser();
  const { updateMyProfile } = useAuth();

  if (!user) return <></>;

  const { firstName, lastName, email, phoneNumber, photo } = user;
  const initialValues: UpdateProfile = {
    firstName,
    lastName,
    email,
    phoneNumber,
    photo,
  };

  const validationSchema = Yup.object().shape({
    firstName: yupFirstName,
    lastName: yupLastName,
    phoneNumber: yupPhoneNumber,
    email: yupEmail,
    photo: yupPhotoUpload,
  });

  const onSubmit = (values: UpdateProfile, actions: FormikHelpers<UpdateProfile>) => {
    // we want to update only the values that has changed
    const updatedValues = updatedDiff(initialValues, values);

    const formData = parseGenericObject(updatedValues);

    updateMyProfile(formData);
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
        <Typography component='h1' variant='h5'>
          עדכון פרופיל
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize // Control whether Formik should reset the form if initialValues changes (using deep equality).
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const isDisabled = !formik.isValid || !formik.values.photo || !formik.dirty;

            return (
              <Form noValidate>
                <RtlProvider>
                  <ImgProfile
                    setFieldValue={formik.setFieldValue}
                    values={formik.values}
                    errors={formik.errors.photo && formik.touched.photo}
                    helperText={<ErrorMessage name='photo' />}
                    apiUrl={`${import.meta.env.VITE_API_URL}/img/users/`}
                  />

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
                    label={"מס' טלפון"}
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

                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 3,
                      mb: 2,
                      cursor: isDisabled ? 'not-allowed !important' : 'pointer',
                      pointerEvents: 'auto !important',
                    }}
                    disabled={isDisabled}
                  >
                    עדכן מידע
                  </Button>
                </RtlProvider>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <Copyright />
    </Container>
  );
};

export default Profile;
