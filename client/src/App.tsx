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
} from '@Utils/LazySuspense';
import Bible from '@Pages/Bible/Bible';

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
          <Route index element={<Bible />} />
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
