import { BsChat, BsHeart, BsHeartFill, BsUpload } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { UserHeader } from './UserHeader';
import { CustomModal, TweetForm } from '../shared';
import { useLikeTweet } from '../shared/hooks/useLikeTweet';
import { useModal } from '../shared/hooks/useModal';
import { TweetImages } from './TweetImages';

export const Tweet = ({ tweet }) => {
  const { open, handleOpen, handleClose } = useModal(false);
  const { like, isLiked, likesCount, isLoading } = useLikeTweet(
    tweet.id,
    tweet.likes
  );

  const handleLike = (e) => {
    e.preventDefault();
    like();
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2 }}
    >
      <Avatar src={tweet.user.avatar.url} alt={`${tweet.user.name}`} />

      <Stack sx={{ width: '100%' }}>
        <UserHeader user={tweet.user} createdAt={tweet.createdAt} withLink />

        <Stack spacing={1.5}>
          <Typography>{tweet.content}</Typography>

          <TweetImages images={tweet?.images} />

          {/** TODO: Refactor buttons into separate component(s) */}
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ fontSize: '13px' }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                '& button ': { color: 'secondary.main' },
                '&:hover, &:hover button': { color: 'primary.main' },
              }}
            >
              <IconButton onClick={handleOpen} color="primary" size="small">
                <BsChat />
              </IconButton>
              {tweet.replies.length > 0 && tweet.replies.length}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                '& button ': { color: 'secondary.main' },
                '&:hover, &:hover button': { color: 'success.main' },
              }}
            >
              <IconButton color="success" size="small">
                <AiOutlineRetweet />
              </IconButton>
            </Stack>
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
                onClick={handleLike}
                disabled={isLoading}
                color={'error'}
                size="small"
              >
                {isLiked ? <BsHeartFill /> : <BsHeart />}
              </IconButton>
              {likesCount > 0 && likesCount}
            </Stack>

            <IconButton
              color="primary"
              size="small"
              sx={{
                color: 'secondary.main',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <BsUpload />
            </IconButton>
          </Stack>

          <CustomModal open={open} handleClose={handleClose}>
            <TweetForm
              tweet={tweet}
              fileInputId={`reply-file-input-${tweet.id}`}
              handleClose={handleClose}
            />
          </CustomModal>
        </Stack>
      </Stack>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
