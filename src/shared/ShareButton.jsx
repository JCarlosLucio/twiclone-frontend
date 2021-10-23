import { BsUpload } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

export const ShareButton = ({ size = 'small' }) => {
  return (
    <Tooltip title="Share" enterDelay={500}>
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
    </Tooltip>
  );
};

ShareButton.propTypes = {
  size: PropTypes.string,
};
