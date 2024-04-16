import { Route, Routes } from 'react-router-dom';
import ProtectRoute from '@Components/ProtectRoute/ProtectRoute';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@ApiService/Requests/useUser';
// Pages
import {
  ProjectStatusPage,
  AdminPage,
  NoMatchPage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  UpdatePasswordPage,
  ErrorFallback,
} from '@Utils/LazySuspense';

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
              <AdminPage />
            </ProtectRoute>
          }
        >
          <Route path='user/Profile' element={<ProfilePage />} />
          <Route path='user/UpdatePassword' element={<UpdatePasswordPage />} />
        </Route>

        <Route path='/ProjectStatus' element={<ProjectStatusPage />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
