import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { getUser } from '../../services/user';

export const useUser = (username) => {
  const { data: user, isLoading } = useQuery({
    queryKey: [queryKeys.user, username],
    queryFn: () => getUser(username),
  });

  return { user, isLoading };
};
