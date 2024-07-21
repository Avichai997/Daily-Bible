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

        <Route
          path='/'
          element={
            <ProtectRoute>
              <HomePage />
            </ProtectRoute>
          }
        >
          <Route index element={<LessonContainer />} />
          <Route path='/Posts/' element={<PostsPage />} />
          <Route path='/PostEditForm' element={<PostEditFormPage />} />
          <Route path='/PostEditForm/:postId' element={<PostEditFormPage />} />
          <Route path='/WhyDailyBible' element={<WhyDailyBible />} />
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/UpdatePassword' element={<UpdatePasswordPage />} />
        </Route>
        <Route path='/ProjectStatus' element={<ProjectStatusPage />} />
        <Route path='*' element={<NoMatch404Page />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
