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
} from '@Utils/LazySuspense';
import { LessonContainer } from '@Pages/Bible/LessonContainer/LessonContainer';
import EditPost from '@Pages/EditPost/EditPost';
import PostPage from '@Pages/PostPage/PostPage';

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
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/WhyDailyBible' element={<WhyDailyBible />} />
          <Route path='/UpdatePassword' element={<UpdatePasswordPage />} />
        </Route>
        <Route path='/posts' element={<PostPage />} />
        <Route path='/ProjectStatus' element={<ProjectStatusPage />} />
        <Route path='/editPost' element={<EditPost />} />
        <Route path='/editPost/:postId' element={<EditPost />} />
        <Route path='/posts/:postId' element={<PostPage />} />
        <Route path='*' element={<NoMatch404Page />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
