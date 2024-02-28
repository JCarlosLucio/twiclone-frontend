import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { getWhoToFollow } from '../../services/user';
import { useMe } from '../../shared/hooks/useMe';

export const useWhoToFollow = () => {
  const { me } = useMe();
  const { data: users, isLoading } = useQuery({
    queryKey: [queryKeys.whotofollow],
    queryFn: () => getWhoToFollow(me.id),
  });
  return { users, isLoading };
};
