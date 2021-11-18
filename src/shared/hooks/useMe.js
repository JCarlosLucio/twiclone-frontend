import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
import { getMe } from '../../services/auth';
import storage from '../../utils/storage';

export const useMe = () => {
  const queryClient = useQueryClient();
  const { data: me = storage.loadUser() } = useQuery(queryKeys.me, getMe, {
    enabled: !!storage.loadUser(),
  });

  const updateUser = (newUser) => {
    // update user(me) in localStorage
    storage.saveUser(newUser);

    // populate user profile in ReactQuery client
    queryClient.setQueryData(queryKeys.me, newUser);
  };

  const clearUser = () => {
    // update user(me) in localStorage
    storage.clearUser();

    // reset user to null in ReactQuery client
    queryClient.setQueryData(queryKeys.me, null);
    queryClient.removeQueries(queryKeys.whotofollow);
  };

  return { me, updateUser, clearUser };
};
