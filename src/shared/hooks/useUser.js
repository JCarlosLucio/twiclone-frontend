import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getUser } from '../../services/user';
import { queryKeys } from '../../constants';

export const useUser = (username) => {
  const { data: user, isLoading } = useQuery([queryKeys.user, username], () =>
    getUser(username)
  );
  return { user, isLoading };
};

useUser.propTypes = {
  username: PropTypes.string.isRequired,
};
