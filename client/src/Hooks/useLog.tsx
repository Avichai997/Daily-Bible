import { IUserLocalStorage } from '@ApiService/Interfaces/IUser';
import { useUser } from '@ApiService/Requests/useUser';
import { USER_QUERY_KEY } from '@Common/CommonConstants';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';

const sessionId = uuid();

const PostLog = (action: number, description: string, user: string) => {
  fetch('http://localhost:5000/api/logs', {
    body: JSON.stringify({ action, description, sessionId, user }),
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem(USER_QUERY_KEY) as string) as IUserLocalStorage;
  PostLog(0, 'end app', user?.id ?? '');
  window.close();
});

export const useLog = ({ action, description }: { action: number; description: string }) => {
  const { user } = useUser();

  const { mutateAsync: LogAsync } = useMutation<unknown, unknown, unknown, unknown>({
    mutationFn: async () => {
      PostLog(action, description, user?.id ?? '');
    },
  });

  useEffect(() => {
    LogAsync(null);
  }, [user]);
};
