import { BsHeart, BsHeartFill } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useLikeTweet } from './hooks/useLikeTweet';

export const LikeButton = ({
  tweetId,
  likes,
  size = 'small',
  showCount = false,
}) => {
  const { like, isLiked, likesCount, isLiking } = useLikeTweet(tweetId, likes);

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
      <IconButton
        onClick={like}
        disabled={isLiking}
        color={'error'}
        size={size}
        sx={{
          '&:disabled, &.Mui-disabled': {
            color: 'error.main',
          },
        }}
      >
        {isLiked ? <BsHeartFill /> : <BsHeart />}
      </IconButton>
      {showCount && likesCount > 0 && likesCount}
    </Stack>
  );
};

LikeButton.propTypes = {
  tweetId: PropTypes.string,
  likes: PropTypes.array,
  size: PropTypes.string,
};
