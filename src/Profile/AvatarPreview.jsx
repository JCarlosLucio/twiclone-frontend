import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

export const AvatarPreview = ({ defaultAvatar, avatar }) => {
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  useEffect(() => {
    if (avatar) {
      const objectUrl = URL.createObjectURL(avatar);
      setAvatarPreview(objectUrl);
      // createdObjectURL remains in memory if not revoked
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatar]);

  return (
    <Avatar
      size="large"
      src={avatarPreview}
      alt="Avatar preview"
      sx={{
        border: '4px solid',
        borderColor: 'background.default',
        backgroundColor: 'divider',
      }}
    />
  );
};

AvatarPreview.propTypes = {
  defaultAvatar: PropTypes.string,
  avatar: PropTypes.object,
};
