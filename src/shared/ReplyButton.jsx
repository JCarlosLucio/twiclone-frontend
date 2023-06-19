import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { BsChat } from 'react-icons/bs';

export const ReplyButton = ({ replies, size = 'small', handleClick }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        '& button ': { color: 'secondary.main' },
        '&:hover, &:hover button': { color: 'primary.main' },
      }}
    >
      <Tooltip title="Reply" enterDelay={500}>
        <IconButton onClick={handleClick} color="primary" size={size}>
          <BsChat />
        </IconButton>
      </Tooltip>
      {replies && replies.length > 0 && replies.length}
    </Stack>
  );
};

ReplyButton.propTypes = {
  replies: PropTypes.array,
  size: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
