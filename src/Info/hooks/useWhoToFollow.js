import { useQuery } from 'react-query';
import { queryKeys } from '../../constants';
import { getWhoToFollow } from '../../services/user';
import { useMe } from '../../shared/hooks/useMe';

export const useWhoToFollow = () => {
  const { me } = useMe();
  const { data: users, isLoading } = useQuery([queryKeys.whotofollow], () =>
    getWhoToFollow(me.id),
  );
  return { users, isLoading };
};
