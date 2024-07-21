import { IProtectRoute } from '@CommonInterfaces';
import { useUser } from '@ApiService/Requests/useUser';
// import { useAtomValue } from 'jotai';
// import { userAtom } from '@Atoms/Atoms';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children }: IProtectRoute) => {
  // const user = useAtomValue(userAtom);
  const { user } = useUser();
  const location = useLocation();

  return user?.id ? <>{children}</> : <Navigate to='/login' state={{ path: location.pathname }} />;
};

export default ProtectRoute;
