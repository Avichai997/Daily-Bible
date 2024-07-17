import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import RtlProvider from '@Utils/RtlProvider';
import Copyright from '@Components/Copyright';
import FormikInput from '@Components/FormikInput/FormikInput';
import * as Yup from 'yup';
import { yupPhotoUpload, yupTextValidation } from '@Utils/yupValidations';
import { updatedDiff } from 'deep-object-diff';
import parseGenericObject from '@Utils/parseGenericObject';
import ImgProfile, { FormikValues } from '@Pages/Profile/ImgProfile';
import { useGetAllPosts, usePostCRUD } from '@ApiService/Requests/usePosts';
import { useNavigate, useParams } from 'react-router-dom';
import { POSTS_QUERY_KEY } from '@CommonConstants';
import { useUser } from '@ApiService/Requests/useUser';
import { PostFormValues } from '@ApiService/Interfaces/IPost';
import classes from './PostEditForm.module.scss';

type PostValues = FormikValues<PostFormValues>;
// TODO: add delete, show and edit comments
const PostEditForm = () => {
  const { user } = useUser();
  const params = useParams();
  const postId = params?.postId;
  const { posts } = useGetAllPosts();
  const post = posts?.find((post) => post.id === postId);
  const navigate = useNavigate();

  const { updatePost, createPost, deletePost } = usePostCRUD();

  const initialValues: PostValues = {
    authorId: user?.id,
    title: post?.title || '',
    content: post?.content || '',
    photo: post?.photo || 'default.jpg',
  };

  const validationSchema = Yup.object().shape({
    title: yupTextValidation(),
    content: yupTextValidation(),
    photo: yupPhotoUpload,
  });

  const onSubmit = (values: PostValues) => {
    if (!postId) {
      const formData = parseGenericObject({ ...values, imageFieldName: 'photo' });

      // @ts-ignore
      createPost(formData);

      return;
    }

    if (post?.id) {
      // We want to update only the values that has changed.
      const updatedValues = updatedDiff(initialValues, values) as Partial<PostValues>;
      const formData = parseGenericObject({ ...updatedValues, imageFieldName: 'photo' });

      // @ts-ignore
      updatePost(post.id, formData);
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box className={classes.box}>
        <Typography component='h1' variant='h5'>
          עריכת פוסט
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize // Control whether Formik should reset the form if initialValues changes (using deep object equality).
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const isDisabled = !formik.isValid || !formik.values.photo || !formik.dirty;

            return (
              <Form noValidate className={classes.profileForm}>
                <RtlProvider>
                  <ImgProfile
                    setFieldValue={formik.setFieldValue}
                    values={formik.values}
                    errors={formik.errors.photo && formik.touched.photo}
                    helperText={<ErrorMessage name='photo' />}
                    apiUrl={`${import.meta.env.VITE_API_URL}/img/${POSTS_QUERY_KEY}/`}
                  />

                  <FormikInput
                    formik={formik}
                    name='title'
                    label='שם הפוסט'
                    type='name'
                    autoComplete='given-name'
                    autoFocus
                  />

                  <FormikInput
                    formik={formik}
                    name='content'
                    label='תוכן הפוסט'
                    type='name'
                    autoComplete='family-name'
                    multiline
                    rows={8}
                  />

                  <Stack
                    direction='row'
                    spacing={5}
                    width='100%'
                    sx={{
                      mt: 3,
                      mb: 3,
                    }}
                  >
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{
                        cursor: isDisabled ? 'not-allowed !important' : 'pointer',
                        pointerEvents: 'auto !important',
                      }}
                      disabled={isDisabled}
                    >
                      {`${postId ? 'עדכן' : 'העלה'} פוסט`}
                    </Button>

                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        cursor: formik.isSubmitting ? 'not-allowed !important' : 'pointer',
                        pointerEvents: 'auto !important',
                      }}
                      disabled={formik.isSubmitting}
                      onClick={() => navigate('/Posts')}
                    >
                      ביטול
                    </Button>
                  </Stack>

                  {postId && (
                    <Button
                      type='submit'
                      variant='contained'
                      color='error'
                      sx={{
                        mt: 3,
                        mb: 2,
                      }}
                      onClick={() => deletePost(postId)}
                    >
                      מחק פוסט
                    </Button>
                  )}
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

export default PostEditForm;
