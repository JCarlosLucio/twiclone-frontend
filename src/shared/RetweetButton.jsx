import { AiOutlineRetweet } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

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
      <IconButton color="success" size={size}>
        <AiOutlineRetweet />
      </IconButton>
    </Stack>
  );
};

RetweetButton.propTypes = {
  size: PropTypes.string,
};
