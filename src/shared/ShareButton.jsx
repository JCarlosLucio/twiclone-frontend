import { BsLink45Deg, BsUpload } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { usePopover } from './hooks/usePopover';

export const ShareButton = ({ size = 'small' }) => {
  const { anchorEl, openPopover, closePopover, id } = usePopover(
    null,
    'share-popover'
  );

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
        <MenuItem>
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
  size: PropTypes.string,
};
