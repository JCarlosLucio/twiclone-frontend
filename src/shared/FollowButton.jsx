import Button from '@mui/material/Button';
import { useFollow } from '../shared/hooks/useFollow';
import { useMe } from '../shared/hooks/useMe';
import PropTypes from 'prop-types';

export const FollowButton = ({ user, variant = 'outlined' }) => {
  const { me } = useMe();

  const { follow, isFollowing } = useFollow(user);

  const following = me.following.includes(user?.id);

  const handleFollow = (e) => {
    e.stopPropagation();
    follow(user?.id);
  };

  return (
    <Button variant={variant} color="secondary" onClick={handleFollow}>
      {(isFollowing && 'Following...') ||
        (following && 'Following') ||
        'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  variant: PropTypes.string,
};
