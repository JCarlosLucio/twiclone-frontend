import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { AiOutlineRetweet } from 'react-icons/ai';

export const RetweetButton = ({ size = 'small' }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        '& button ': { color: 'secondary.main' },
        '&:hover, &:hover button': { color: 'success.main' },
      }}
    >
      <Tooltip title="Retweet" enterDelay={500}>
        <IconButton color="success" size={size}>
          <AiOutlineRetweet />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

RetweetButton.propTypes = {
  size: PropTypes.string,
};
