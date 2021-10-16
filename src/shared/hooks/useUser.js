import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getUser } from '../../services/user';
import { queryKeys } from '../../constants';

export const useUser = (username) => {
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery([queryKeys.user, username], () => getUser(username));
  return { user, isLoading, isError, error };
};

useUser.propTypes = {
  username: PropTypes.string.isRequired,
};
