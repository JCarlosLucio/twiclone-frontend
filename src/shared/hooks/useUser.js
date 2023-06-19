import { useQuery } from 'react-query';

import { queryKeys } from '../../constants';
import { getUser } from '../../services/user';

export const useUser = (username) => {
  const { data: user, isLoading } = useQuery([queryKeys.user, username], () =>
    getUser(username),
  );
  return { user, isLoading };
};
