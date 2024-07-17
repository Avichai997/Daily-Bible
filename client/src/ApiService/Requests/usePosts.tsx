import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ICreatePostRequest, IPost } from '@Interfaces/IPost';
import { IMutation, QueryOptions } from '@CommonInterfaces';
import { useNavigate } from 'react-router-dom';
import {
  updateRQCacheAfterCreate,
  updateRQCacheAfterDelete,
  updateRQCacheAfterUpdate,
} from '@CommonFunctions';
import { POSTS_QUERY_KEY } from '@CommonConstants';
import { ToastSuccess } from '@Components/Toastify/Toasts';

export const useGetAllPosts = (options?: QueryOptions<IPost[]>) => {
  const { data: posts, ...queryInfo } = useQuery<IPost[]>({
    queryKey: [POSTS_QUERY_KEY],
    ...options,
  });

  return { posts, ...queryInfo };
};

export const useGetPost = (id: string, options?: QueryOptions<IPost>) => {
  const { data: post, ...queryInfo } = useQuery<IPost>({
    queryKey: [`${POSTS_QUERY_KEY}/${id}`],
    ...options,
  });

  return { post, ...queryInfo };
};
export const usePostCRUD = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: CreatePost, ...createMutateInfo } = useMutation<
    IPost,
    unknown,
    IMutation<ICreatePostRequest>
  >({});

  const { mutate: UpdatePost, ...updateMutateInfo } = useMutation<IPost, unknown, IMutation<IPost>>(
    {}
  );

  const { mutate: DeletePost, ...deleteMutateInfo } = useMutation<
    string,
    unknown,
    IMutation<object>
  >({});

  const createPost = (
    data: ICreatePostRequest,
    options?: UseMutationOptions<IPost, unknown, IMutation<ICreatePostRequest>>
  ) => {
    CreatePost(
      {
        method: 'Post',
        path: POSTS_QUERY_KEY,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      },
      {
        onSuccess: (createdPost) => {
          updateRQCacheAfterCreate(createdPost, queryClient, POSTS_QUERY_KEY);
          ToastSuccess('הפוסט נוצר בהצלחה');
          navigate(`/PostEditForm/${createdPost.id}`);
        },
        ...options,
      }
    );
  };

  const updatePost = (
    id: string,
    data: IPost,
    options?: UseMutationOptions<IPost, unknown, IMutation<IPost>>
  ) => {
    UpdatePost(
      {
        method: 'Patch',
        path: `${POSTS_QUERY_KEY}/${id}`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      },
      {
        onSuccess: (updatedPost) => {
          updateRQCacheAfterUpdate(updatedPost, queryClient, POSTS_QUERY_KEY);
          ToastSuccess('הפוסט עודכן בהצלחה');
        },
        ...options,
      }
    );
  };

  const deletePost = (
    id: string,
    options?: UseMutationOptions<unknown, unknown, IMutation<Partial<IPost>>>
  ) => {
    DeletePost(
      {
        method: 'Delete',
        path: `${POSTS_QUERY_KEY}/${id}`,
        headers: {},
        data: {
          imageFieldName: 'photo',
        },
      },
      {
        onSuccess: () => {
          updateRQCacheAfterDelete(id, queryClient, POSTS_QUERY_KEY);
          ToastSuccess('הפוסט נמחק בהצלחה');
          navigate('/Posts');
        },
        ...options,
      }
    );
  };

  return {
    createPost,
    updatePost,
    deletePost,
    createMutateInfo,
    updateMutateInfo,
    deleteMutateInfo,
  };
};
