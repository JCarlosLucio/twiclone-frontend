import { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useFollow } from '../shared/hooks/useFollow';
import { useMe } from '../shared/hooks/useMe';

export const FollowButton = ({ user }) => {
  const { me } = useMe();
  const { follow, isFollowing } = useFollow(user);
  const [isHovered, setIsHovered] = useState(false);

  const following = me.following.includes(user?.id);

  const handleFollow = (e) => {
    e.stopPropagation();
    follow(user?.id);
  };

  return (
    <Button
      variant={following ? 'outlined' : 'contained'}
      onClick={handleFollow}
      color="secondary"
      sx={{
        minWidth: following ? '100px' : 'auto',
        ':hover': following && {
          borderColor: 'error.main',
          color: 'error.main',
          bgcolor: '#d32f2f25',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isFollowing && 'Following...') ||
        (following && !isHovered && 'Following') ||
        (following && isHovered && 'Unfollow') ||
        'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
};
