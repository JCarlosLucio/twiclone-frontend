import { useQuery, useQueryClient } from 'react-query';

import { queryKeys } from '../../constants';
import { getMe } from '../../services/auth';
import storage from '../../utils/storage';

export const useMe = () => {
  const queryClient = useQueryClient();

  const clearUser = () => {
    // update user(me) in localStorage
    storage.clearUser();

    // reset user to null in ReactQuery client
    queryClient.setQueryData(queryKeys.me, null);
    queryClient.removeQueries(queryKeys.whotofollow);
  };

  const { data: me = storage.loadUser() } = useQuery(queryKeys.me, getMe, {
    enabled: !!storage.loadUser(),
    onSuccess: (received) => {
      if (received) {
        storage.saveUser(received);
      } else {
        clearUser();
      }
    },
    onError: clearUser,
  });

  const updateUser = (newUser) => {
    // update user(me) in localStorage
    storage.saveUser(newUser);

    // populate user profile in ReactQuery client
    queryClient.setQueryData(queryKeys.me, newUser);
  };

  return { me, updateUser, clearUser };
};
