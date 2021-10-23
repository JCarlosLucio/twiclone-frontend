import { BsHeart, BsHeartFill } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useLikeTweet } from './hooks/useLikeTweet';
import Tooltip from '@mui/material/Tooltip';

export const LikeButton = ({
  tweetId,
  likes,
  size = 'small',
  showCount = false,
}) => {
  const { like, isLiked, likesCount, isLiking } = useLikeTweet(tweetId, likes);

  const handleLike = (e) => {
    e.stopPropagation();
    like();
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        color: isLiked ? 'error.main' : 'secondary.main',
        '& button ': {
          color: isLiked ? 'error.main' : 'secondary.main',
        },
        '&:hover, &:hover button': { color: 'error.main' },
      }}
    >
      <Tooltip title="Like" enterDelay={500}>
        <IconButton
          onClick={handleLike}
          disabled={isLiking}
          color="error"
          size={size}
          sx={{
            '&:disabled, &.Mui-disabled': {
              color: 'error.main',
            },
          }}
        >
          {isLiked ? <BsHeartFill /> : <BsHeart />}
        </IconButton>
      </Tooltip>
      {showCount && likesCount > 0 && likesCount}
    </Stack>
  );
};

LikeButton.propTypes = {
  tweetId: PropTypes.string,
  likes: PropTypes.array,
  size: PropTypes.string,
  showCount: PropTypes.bool,
};
