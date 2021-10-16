import { useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import { followUser } from '../../services/user';
import { queryKeys } from '../../constants';
import { useMe } from './useMe';

export const useFollow = (user) => {
  const queryClient = useQueryClient();
  const { me } = useMe();

  const { mutate: follow, isLoading: isFollowing } = useMutation(followUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.me, {
        ...data.updatedMe,
        token: me.token,
      });
      queryClient.setQueryData(
        [queryKeys.user, user.username],
        data.updatedUser
      );
    },
  });

  return { follow, isFollowing };
};

useFollow.propTypes = {
  user: PropTypes.object.isRequired,
};
