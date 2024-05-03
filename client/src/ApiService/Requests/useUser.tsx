/* eslint-disable @tanstack/query/no-deprecated-options */
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { ILoginSignupResponse, IUserLocalStorage } from '@ApiService/Interfaces/IUser';
import { USER_QUERY_KEY } from '@CommonConstants';
import { useAuth } from '@ApiService/Requests/useAuth';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { updateLocaleStorage, logoutUser } = useAuth();

  const checkUser = async (queryClient: QueryClient) => {
    // dummy function - check if user stored in react query cache and return it.
    const user = queryClient.getQueryData<IUserLocalStorage>([USER_QUERY_KEY]);

    // eslint-disable-next-line prefer-promise-reject-errors
    return typeof user === 'undefined' ? Promise.reject(null) : Promise.resolve(user);
  };

  const getStoredUser = (logout: (tokenExpired: boolean) => void, QueryClient: QueryClient) => {
    // This function handles user authentication global state

    // 1) Check if user stored in local storage
    const storedUser = JSON.parse(
      localStorage.getItem(USER_QUERY_KEY) as string
    ) as IUserLocalStorage;
    if (!storedUser) return undefined;

    // 2) check if user's token expired, if so - log the user out.
    const tokenIsValid = new Date(storedUser.tokenExpiration as unknown as string) > new Date();
    // 3) Token expiration is valid so we set timer to logout user when token expires
    const logoutTimeoutId = QueryClient.getQueryData<number>(['logoutTimeoutId']);

    if (!tokenIsValid && !logoutTimeoutId) {
      // logoutUser() is async function so we set user = undefined in localStorage and in react query cache
      // to prevent getStoredUser function from being called again and run logoutUser() again
      localStorage.setItem(USER_QUERY_KEY, JSON.stringify(null));
      QueryClient.setQueryData([USER_QUERY_KEY], undefined);
      logoutUser(true);

      return undefined;
    }

    // if logoutTimeoutId is undefined, then we need to set the timeout to auto logout user
    if (logoutTimeoutId) return storedUser;

    // if logoutTimeoutId is undefined, then we need to set the timeout to auto logout user
    const logoutAt = new Date(storedUser.tokenExpiration).getTime() - Date.now();

    const id = setTimeout(() => {
      clearTimeout(id);
      QueryClient.setQueryData(['logoutTimeoutId'], undefined);
      logoutUser(true);
    }, logoutAt);

    QueryClient.setQueryData(['logoutTimeoutId'], id);

    return storedUser;
  };

  const { data: user } = useQuery<IUserLocalStorage, unknown, IUserLocalStorage>({
    // @ts-expect-error
    queryKey: [USER_QUERY_KEY],
    queryFn: () => checkUser(queryClient),
    initialData: getStoredUser(logoutUser, queryClient),
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess: (res: ILoginSignupResponse) => updateLocaleStorage(res),
    onError: () => updateLocaleStorage(null),
  });

  return {
    user,
  };
};
