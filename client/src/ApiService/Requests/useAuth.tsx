import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { IMutation, QueryOptions } from '@CommonInterfaces';
import { USER_QUERY_KEY } from '@CommonConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IUpdateMyPasswordResponse,
  IUpdateMyProfileRequest,
  IUser,
  IUserLocalStorage,
  ILoginSignupResponse,
  ISignupRequest,
  ILoginRequest,
  ILogoutResponse,
  IUpdateMyPasswordRequest,
  IUpdateMyProfileResponse,
  IResetPasswordRequest,
  ResetPasswordData,
  IConfirmEmailRequest,
  ISendConfirmEmailRequest,
} from '@ApiService/Interfaces/IUser';
import { ToastInfo, ToastSuccess } from '@Components/Toastify/Toasts';
import { FormikHelpers } from 'formik';

export const useGetAllUsers = (options?: QueryOptions<IUser[]>) => {
  const { data: Users, ...queryInfo } = useQuery<IUser[]>({
    queryKey: [USER_QUERY_KEY],
    ...options,
  });

  return { Users, ...queryInfo };
};

export const useGetUser = (id: string, options?: QueryOptions<IUser>) => {
  const { data: user, ...queryInfo } = useQuery<IUser>({
    queryKey: [`${USER_QUERY_KEY}/${id}`],
    enabled: !!id,
    ...options,
  });

  return { user, ...queryInfo };
};

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const updateLocaleStorage = (userResponse: ILoginSignupResponse | null) => {
    // extract specific fields from raw user data and set it in memory and cache

    const userDetails = userResponse && {
      tokenExpiration: userResponse?.tokenExpiration,
      id: userResponse.data.id,
      name: userResponse.data.name,
      firstName: userResponse.data.firstName,
      lastName: userResponse.data.lastName,
      email: userResponse.data.email,
      phoneNumber: userResponse.data.phoneNumber,
      photo: userResponse.data.photo,
      emailVerified: userResponse.data.emailVerified,
      role: userResponse.data.role,
    };

    localStorage.setItem(USER_QUERY_KEY, JSON.stringify(userDetails));
    queryClient.setQueryData([USER_QUERY_KEY], userDetails);
  };

  const getUser = () => queryClient.getQueryData([USER_QUERY_KEY]);

  const { mutate: SignupUser, ...signupUserMutateInfo } = useMutation<
    ILoginSignupResponse,
    unknown,
    IMutation<ISignupRequest>
  >({});

  const { mutate: LoginUser, ...loginUserMutateInfo } = useMutation<
    ILoginSignupResponse,
    unknown,
    IMutation<ILoginRequest>
  >({});

  const { mutate: LogoutUser, ...logoutUserMutateInfo } = useMutation<
    ILogoutResponse,
    unknown,
    IMutation<null>
  >({});

  const { mutate: UpdateMyProfile, ...updateMyProfileMutateInfo } = useMutation<
    IUpdateMyProfileResponse,
    unknown,
    IMutation<IUpdateMyProfileRequest>
  >({});

  const { mutate: UpdateMyPassword, ...updateMyPasswordMutateInfo } = useMutation<
    IUpdateMyPasswordResponse,
    unknown,
    IMutation<IUpdateMyPasswordRequest>
  >({});

  const { mutate: ForgotPassword, ...forgotPasswordMutateInfo } = useMutation<
    IForgotPasswordResponse,
    unknown,
    IMutation<IForgotPasswordRequest>
  >({});

  const { mutate: ResetMyPassword, ...resetMyPasswordMutateInfo } = useMutation<
    ILoginSignupResponse,
    unknown,
    IMutation<IResetPasswordRequest>
  >({});

  const { mutate: ConfirmMyEmail, ...confirmMyEmailMutateInfo } = useMutation<
    ILoginSignupResponse,
    unknown,
    IMutation<IConfirmEmailRequest>
  >({});

  const { mutate: SendConfirmEmail, ...sendConfirmEmailMutateInfo } = useMutation<
    null,
    unknown,
    IMutation<ISendConfirmEmailRequest>
  >({});

  const signupUser = (
    data: ISignupRequest,
    options?: UseMutationOptions<ILoginSignupResponse, unknown, IMutation<ISignupRequest>>
  ) => {
    SignupUser(
      {
        method: 'Post',
        path: `${USER_QUERY_KEY}/signup`,
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess('ההרשמה בוצעה בהצלחה!');
          ToastSuccess(`שלום ${res.data.name}`);
          updateLocaleStorage(res);
          navigate(location?.state?.path || '/', { replace: true });
        },
        ...options,
      }
    );
  };

  const loginUser = (
    data: ILoginRequest,
    path: string = 'login',
    options?: UseMutationOptions<ILoginSignupResponse, unknown, IMutation<ILoginRequest>>
  ) => {
    console.log(JSON.stringify(data));
    LoginUser(
      {
        method: 'Post',
        path: `${USER_QUERY_KEY}/${path}`,
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess(`שלום ${res.data.name}`);
          updateLocaleStorage(res);
          navigate(
            // location?.state?.path ||
            '/',
            { replace: true }
          );
        },
        ...options,
      }
    );
  };

  const logoutUser = (
    tokenExpired: boolean = false,
    options?: UseMutationOptions<ILogoutResponse, unknown, IMutation<null>>
  ) => {
    LogoutUser(
      {
        method: 'Get',
        path: `${USER_QUERY_KEY}/logout`,
        data: null,
      },
      {
        onSuccess: () => {
          const logoutTimeoutId = parseInt(queryClient.getQueryData(['logoutTimeoutId']) as string);

          // if the user try to logout clear the auto-logout function
          if (logoutTimeoutId) {
            clearTimeout(logoutTimeoutId);
            queryClient.setQueryData(['logoutTimeoutId'], null);
          }

          if (tokenExpired) ToastInfo('.עבר זמן רב מאז ההתחברות האחרונה שלך, יש להתחבר מחדש');
          updateLocaleStorage(null);
          navigate('/Login');
        },
        ...options,
      }
    );
  };

  const updateMyProfile = (
    data: IUpdateMyProfileRequest,
    options?: UseMutationOptions<
      IUpdateMyProfileResponse,
      unknown,
      IMutation<IUpdateMyProfileRequest>
    >
  ) => {
    UpdateMyProfile(
      {
        method: 'Patch',
        path: `${USER_QUERY_KEY}/updateMe`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess('!עדכון נתונים בוצע בהצלחה');
          const { tokenExpiration } = queryClient.getQueryData(['users']) as IUserLocalStorage;
          updateLocaleStorage({ ...res, tokenExpiration });
        },
        ...options,
      }
    );
  };

  const updateMyPassword = (
    data: IUpdateMyPasswordRequest,
    options?: UseMutationOptions<
      IUpdateMyPasswordResponse,
      unknown,
      IMutation<IUpdateMyPasswordRequest>
    >,
    resetForm?: FormikHelpers<typeof data>['resetForm']
  ) => {
    UpdateMyPassword(
      {
        method: 'Patch',
        path: `${USER_QUERY_KEY}/updateMyPassword`,
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess('!הסיסמה שלך עודכנה בהצלחה');
          updateLocaleStorage(res);
          if (resetForm) resetForm();
        },
        ...options,
      }
    );
  };

  const forgotPassword = (
    data: IForgotPasswordRequest,
    options?: UseMutationOptions<
      IForgotPasswordResponse,
      unknown,
      IMutation<IForgotPasswordRequest>
    >
  ) => {
    ForgotPassword(
      {
        method: 'Post',
        path: `${USER_QUERY_KEY}/forgotPassword`,
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess(res.message);
        },
        ...options,
      }
    );
  };

  const resetMyPassword = (
    { temporaryToken, password, passwordConfirm }: ResetPasswordData,
    options?: UseMutationOptions<ILoginSignupResponse, unknown, IMutation<IResetPasswordRequest>>
  ) => {
    ResetMyPassword(
      {
        method: 'Patch',
        path: `${USER_QUERY_KEY}/resetPassword/${temporaryToken}`,
        data: { password, passwordConfirm },
      },
      {
        onSuccess: (res) => {
          ToastSuccess('!הסיסמה שלך עודכנה בהצלחה');
          updateLocaleStorage(res);
          navigate('/', { replace: true });
        },
        ...options,
      }
    );
  };

  const confirmMyEmail = (
    data: IConfirmEmailRequest,
    options?: UseMutationOptions<ILoginSignupResponse, unknown, IMutation<IConfirmEmailRequest>>
  ) => {
    ConfirmMyEmail(
      {
        method: 'Post',
        path: `${USER_QUERY_KEY}/confirmEmail`,
        data,
      },
      {
        onSuccess: (res) => {
          ToastSuccess('!כתובת האימייל אומתה בהצלחה');
          updateLocaleStorage(res);
        },
        ...options,
      }
    );
  };

  const sendConfirmEmail = (
    data: IConfirmEmailRequest,
    options?: UseMutationOptions<null, unknown, IMutation<ISendConfirmEmailRequest>>
  ) => {
    SendConfirmEmail(
      {
        method: 'Post',
        path: `${USER_QUERY_KEY}/sendConfirmEmail`,
        data,
      },
      {
        onSuccess: () => {
          ToastSuccess('נשלח לך מייל לאימות החשבון');
        },
        ...options,
      }
    );
  };

  return {
    getUser,
    signupUser,
    loginUser,
    logoutUser,
    updateMyProfile,
    updateMyPassword,
    updateLocaleStorage,
    forgotPassword,
    resetMyPassword,
    confirmMyEmail,
    sendConfirmEmail,
    signupUserMutateInfo,
    logoutUserMutateInfo,
    loginUserMutateInfo,
    updateMyProfileMutateInfo,
    updateMyPasswordMutateInfo,
    forgotPasswordMutateInfo,
    resetMyPasswordMutateInfo,
    confirmMyEmailMutateInfo,
    sendConfirmEmailMutateInfo,
  };
};
