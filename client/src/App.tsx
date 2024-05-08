import { Route, Routes } from 'react-router-dom';
import ProtectRoute from '@Components/ProtectRoute/ProtectRoute';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@ApiService/Requests/useUser';
// Pages
import {
  ProjectStatusPage,
  HomePage,
  NoMatchPage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  UpdatePasswordPage,
  ErrorFallback,
} from '@Utils/LazySuspense';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const App = () => {
  const { reset } = useQueryErrorResetBoundary();
  useUser();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={} FallbackComponent={ErrorFallback}>
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
          <Route index element={<div>HOME PAGE BITCH</div>} />
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/UpdatePassword' element={<UpdatePasswordPage />} />
        </Route>

        <Route path='/ProjectStatus' element={<ProjectStatusPage />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
