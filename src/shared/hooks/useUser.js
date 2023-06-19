import { useQuery } from 'react-query';
import { getUser } from '../../services/user';
import { queryKeys } from '../../constants';

export const useUser = (username) => {
  const { data: user, isLoading } = useQuery([queryKeys.user, username], () =>
    getUser(username),
  );
  return { user, isLoading };
};
