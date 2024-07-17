import { Route, Routes } from 'react-router-dom';
import ProtectRoute from '@Components/ProtectRoute/ProtectRoute';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@ApiService/Requests/useUser';
// Pages
import {
  ProjectStatusPage,
  HomePage,
  NoMatch404Page,
  LoginPage,
  SignUpPage,
  ProfilePage,
  UpdatePasswordPage,
  ErrorFallback,
  WhyDailyBible,
  PostEditFormPage,
} from '@Utils/LazySuspense';
import { LessonContainer } from '@Pages/Bible/LessonContainer/LessonContainer';
import EditPost from '@Pages/EditPost/EditPost';
import Posts from '@Pages/Posts/Posts';

const App = () => {
  useUser();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUpPage />} />

        <Route path='/' element={<HomePage />}>
          <Route index element={<LessonContainer />} />
          <Route path='/Posts/' element={<Posts />} />
          <Route path='/PostEditForm' element={<PostEditFormPage />} />
          <Route path='/PostEditForm/:postId' element={<PostEditFormPage />} />
          <Route path='/WhyDailyBible' element={<WhyDailyBible />} />
          <Route path='/editPost' element={<EditPost />} />
          <Route path='/editPost/:postId' element={<EditPost />} />
          <Route
            path='/Profile'
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route
            path='/UpdatePassword'
            element={
              <ProtectRoute>
                <UpdatePasswordPage />
              </ProtectRoute>
            }
          />
        </Route>
        <Route path='/ProjectStatus' element={<ProjectStatusPage />} />
        <Route path='*' element={<NoMatch404Page />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
