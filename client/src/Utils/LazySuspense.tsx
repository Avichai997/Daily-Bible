/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentPropsWithoutRef,
  ComponentType,
  LazyExoticComponent,
  Suspense,
  lazy,
} from 'react';
import Loading from '@Components/Loading/Loading';

// Wrapper function used to suspense lazy loading routes for code splitting
const LazySuspense = (Component: LazyExoticComponent<ComponentType<any>>) =>
  function Fallback(props: ComponentPropsWithoutRef<typeof Component>) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default LazySuspense;

export const ProjectStatusPage = LazySuspense(
  lazy(() => import('@Pages/ProjectStatus/ProjectStatus'))
);
export const LoginPage = LazySuspense(lazy(() => import('@Pages/Login/Login')));
export const SignUpPage = LazySuspense(lazy(() => import('@Pages/Signup/Signup')));
export const HomePage = LazySuspense(lazy(() => import('@Pages/Home/Home')));
export const ProfilePage = LazySuspense(lazy(() => import('@Pages/Profile/Profile')));
export const WhyDailyBible = LazySuspense(lazy(() => import('@Pages/WhyDailyBible/WhyDailyBible')));
export const UpdatePasswordPage = LazySuspense(
  lazy(() => import('@Pages/UpdatePassword/UpdatePassword'))
);
export const NoMatch404Page = LazySuspense(lazy(() => import('@Pages/NoMatch404/NoMatch')));
export const ErrorFallback = LazySuspense(
  lazy(() => import('@Components/ErrorFallback/ErrorFallback'))
);
