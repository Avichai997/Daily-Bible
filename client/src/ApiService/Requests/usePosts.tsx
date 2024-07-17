// import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
// import { IPost } from '@Interfaces/';
// import { IMutation, QueryOptions } from '@CommonInterfaces';
// import { SCENARIO_QUERY_KEY, SYSTEM_SETTINGS_QUERY_KEY } from '@Common/ReactQuerykeys';
// import { useNavigate } from 'react-router-dom';
// import { updateRQCacheAfterCreate, updateRQCacheAfterUpdate } from '@CommonFunctions';
// import { UserAtom } from '@Atoms/Atoms';
// import { IAssignment } from '@ApiService/Interfaces/IAssignment';
// import { AxiosError } from 'axios';
// import { useUser } from './useUser';

// export const useGetAllPosts = (options?: QueryOptions<IPost[]>) => {
//   const { data: posts, ...queryInfo } = useQuery<IPost[]>({
//     queryKey: [SCENARIO_QUERY_KEY],
//     ...options,
//   });

//   return { posts, ...queryInfo };
// };

// export const useGetPost = (id: string, options?: QueryOptions<IPost>) => {
//   const user = useRecoilValue(UserAtom);

//   const { data: post, ...queryInfo } = useQuery<IPost>({
//     queryKey: [`${SCENARIO_QUERY_KEY}/${id}`],
//     ...options,
//     enabled: !!user.UserId && options?.enabled,
//   });

//   return { post, ...queryInfo };
// };
// export const usePostCRUD = () => {
//   const { posts } = useGetAllPosts();
//   const user = useRecoilValue(UserAtom);
//   const isRachelOrPikudAdmin = isUserRachelAdmin(user) || isUserPikudAdmin(user);
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { mutate: CreatePost, ...createMutateInfo } = useMutation<IPost, unknown, IMutation<IPost>>(
//     {}
//   );

//   const { mutate: UpdatePost, ...updateMutateInfo } = useMutation<IPost, unknown, IMutation<IPost>>(
//     {}
//   );

//   const { mutate: DeletePost, ...deleteMutateInfo } = useMutation<
//     string,
//     unknown,
//     IMutation<IPost>
//   >({});
//   const { mutate: DuplicatePost, ...duplicateMutateInfo } = useMutation<
//     IDuplicatePostProps,
//     unknown,
//     IMutation<IDuplicatePostProps>
//   >({});
//   const { mutate: UpdateEnvironmentToTraining, ...updateEnvironmentToTrainingMutateInfo } =
//     useMutation<string, AxiosError, IMutation<PostToTrainingEnvironment>>({});

//   const createPost = (
//     data: IPost,
//     options?: UseMutationOptions<IPost, unknown, IMutation<IPost>>
//   ) => {
//     CreatePost(
//       {
//         method: 'Post',
//         path: SCENARIO_QUERY_KEY,
//         headers: {},
//         data,
//       },
//       {
//         onSuccess: (postCreated) => {
//           updateRQCacheAfterCreate(postCreated, queryClient, SCENARIO_QUERY_KEY);
//           navigate('/Administrator');
//         },

//         ...options,
//       }
//     );
//   };
//   const duplicatePost = (
//     data: IDuplicatePostProps,
//     options?: UseMutationOptions<unknown, unknown, IMutation<IDuplicatePostProps>>
//   ) => {
//     DuplicatePost(
//       {
//         method: 'Post',
//         path: `${SCENARIO_QUERY_KEY}/${data.id}`,
//         headers: {},
//         data,
//       },
//       {
//         onSuccess: () =>
//           queryClient.invalidateQueries({
//             queryKey: [SCENARIO_QUERY_KEY],
//           }),
//         ...options,
//       }
//     );
//   };

//   const updatePost = (
//     id: string,
//     data: IPost,
//     options?: UseMutationOptions<IPost, unknown, IMutation<IPost>>
//   ) => {
//     const oldPost = posts?.find((post) => post.id === id);
//     UpdatePost(
//       {
//         method: 'Put',
//         path: `${SCENARIO_QUERY_KEY}/${id}`,
//         headers: {},
//         data,
//       },
//       {
//         onSuccess: (postUpdated) => {
//           const assignments = queryClient.getQueryData(['Assignment']) as IAssignment[];
//           let newAssignment;
//           if (oldPost?.status !== postUpdated.status) {
//             assignments?.forEach((assignment) => {
//               if (assignment.post === id) {
//                 newAssignment = {
//                   ...structuredClone(assignment),
//                   assignmentDetail: {
//                     ...assignment.assignmentDetail,
//                     status: {
//                       routine: postUpdated.status,
//                       operational: postUpdated.status,
//                     },
//                   },
//                 };

//                 updateRQCacheAfterUpdate(
//                   newAssignment,
//                   queryClient,
//                   getQueryKeyAssignmentByUser(isRachelOrPikudAdmin, [postUpdated])
//                 );
//               }
//             });
//           }

//           updateRQCacheAfterUpdate(postUpdated, queryClient, SCENARIO_QUERY_KEY);
//           navigate('/Administrator');
//         },
//         ...options,
//       }
//     );
//   };

//   const deletePost = (
//     id: string,
//     data: IPost,
//     options?: UseMutationOptions<unknown, unknown, IMutation<IPost>>
//   ) => {
//     DeletePost(
//       {
//         method: 'Delete',
//         path: `${SCENARIO_QUERY_KEY}/${id}`,
//         headers: {},
//         data,
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries({
//             queryKey: [SCENARIO_QUERY_KEY],
//           });
//         },
//         ...options,
//       }
//     );
//   };

//   const updateEnvironmentToTraining = (
//     data: PostToTrainingEnvironment,
//     options?: UseMutationOptions<string, AxiosError, IMutation<PostToTrainingEnvironment>>
//   ) => {
//     UpdateEnvironmentToTraining(
//       {
//         method: 'Post',
//         path: `${SYSTEM_SETTINGS_QUERY_KEY}/updateEnvironmentToTraining`,
//         headers: {},
//         data,
//       },
//       {
//         ...options,
//       }
//     );
//   };

//   return {
//     createPost,
//     updatePost,
//     deletePost,
//     duplicatePost,
//     createMutateInfo,
//     updateMutateInfo,
//     deleteMutateInfo,
//     duplicateMutateInfo,
//     updateEnvironmentToTraining,
//     updateEnvironmentToTrainingMutateInfo,
//   };
// };
