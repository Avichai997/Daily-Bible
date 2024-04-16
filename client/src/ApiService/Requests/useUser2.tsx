// import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
// import { EmptyObject, IMutation, QueryOptions } from '@CommonInterfaces';
// import {
//   updateRQCacheAfterCreate,
//   updateRQCacheAfterDelete,
//   updateRQCacheAfterUpdate,
// } from '@CommonFunctions';
// import { IUser } from '@ApiService/Interfaces/IUser';
// import { USER_QUERY_KEY } from '@CommonConstants';
// import { useNavigate } from 'react-router-dom';
// import { UserAtom } from '@Atoms/Atoms';

// export const useGetAllUsers = (options?: QueryOptions<IUser[]>) => {
//   const { data: users, ...queryInfo } = useQuery<IUser[]>({
//     queryKey: [USER_QUERY_KEY],
//     ...options,
//     enabled: !!(UserAtom && UserAtom.role === 'admin'),
//   });

//   return { users, ...queryInfo };
// };

// export const useUser = (id: string, options?: QueryOptions<IUser>) => {
//   const { data: book, ...queryInfo } = useQuery<IUser>({
//     queryKey: [`${USER_QUERY_KEY}/${id}`],
//     ...options,
//   });

//   return { book, ...queryInfo };
// };

// export const signup = ({
//   firstName,
//   lastName,
//   email,
//   phoneNumber,
//   password,
//   passwordConfirm,
// }: signup) =>
//   authMutation(
//     {
//       method: 'Post',
//       path: 'users/signup',
//       data: {
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         password,
//         passwordConfirm,
//       },
//     },
//     {
//       onSuccess: (data: ResponseLoginSignup) => {
//         ToastSuccess('.ההרשמה בוצעה בהצלחה! נשלח לך מייל לאימות החשבון');
//         updateLocaleStorage(data);
//       },
//     }
//   );
