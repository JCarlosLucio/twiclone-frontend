import Button from '@mui/material/Button';
import { useFollow } from '../shared/hooks/useFollow';
import { useMe } from '../shared/hooks/useMe';
import PropTypes from 'prop-types';

export const FollowButton = ({ user }) => {
  const { me } = useMe();

  const { follow, isFollowing } = useFollow(user);

  const following = me.following.includes(user?.id);

  const handleFollow = (e) => {
    e.stopPropagation();
    follow(user?.id);
  };

  return (
    <Button
      variant="secondary"
      onClick={handleFollow}
      sx={{ border: '1px solid', borderColor: 'secondary' }}
    >
      {(isFollowing && 'Following...') ||
        (following && 'Following') ||
        'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
};
