import { BsUpload } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

export const ShareButton = ({ size = 'small' }) => {
  return (
    <IconButton
      color="primary"
      size={size}
      sx={{
        color: 'secondary.main',
        '&:hover': { color: 'primary.main' },
      }}
    >
      <BsUpload />
    </IconButton>
  );
};

ShareButton.propTypes = {
  size: PropTypes.string,
};
