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
  PostsPage,
} from '@Utils/LazySuspense';
import { LessonContainer } from '@Pages/Bible/LessonContainer/LessonContainer';

const App = () => {
  useUser();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUpPage />} />

        <Route path='/' element={<HomePage />}>
          <Route index element={<LessonContainer />} />
          <Route path='/Posts/' element={<PostsPage />} />
          <Route
            path='/PostEditForm'
            element={
              <ProtectRoute>
                <PostEditFormPage />
              </ProtectRoute>
            }
          />
          <Route
            path='/PostEditForm/:postId'
            element={
              <ProtectRoute>
                <PostEditFormPage />
              </ProtectRoute>
            }
          />
          <Route path='/WhyDailyBible' element={<WhyDailyBible />} />
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
