import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { BsLink45Deg, BsUpload } from 'react-icons/bs';

import SnackbarUtils from '../utils/SnackbarUtils';
import { usePopover } from './hooks/usePopover';

export const ShareButton = ({
  tweetUsername = '',
  tweetId = '',
  size = 'small',
}) => {
  const { anchorEl, openPopover, closePopover, id } = usePopover(
    null,
    'share-popover',
  );

  const copyLinkToTweet = (e) => {
    e.stopPropagation();
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/${tweetUsername}/status/${tweetId}`;
    navigator.clipboard.writeText(link);
    closePopover();
    SnackbarUtils.info('Copied to clipboard');
  };

  return (
    <>
      <Tooltip title="Share" enterDelay={500}>
        <IconButton
          color="primary"
          size={size}
          sx={{
            color: 'secondary.main',
            '&:hover': { color: 'primary.main' },
          }}
          onClick={openPopover}
        >
          <BsUpload />
        </IconButton>
      </Tooltip>
      <Menu
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPaper-root': { borderRadius: '5px' },
          '& .MuiList-padding': { padding: 0 },
        }}
      >
        <MenuItem onClick={copyLinkToTweet}>
          <ListItemIcon>
            <BsLink45Deg fontSize="large" />
          </ListItemIcon>
          <ListItemText>Copy Link to Tweet</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

ShareButton.propTypes = {
  tweetUsername: PropTypes.string,
  tweetId: PropTypes.string,
  size: PropTypes.string,
};
