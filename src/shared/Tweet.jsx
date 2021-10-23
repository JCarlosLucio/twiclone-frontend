import { AiOutlineRetweet } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { LikeButton } from './LikeButton';
import { ReplyButton } from './ReplyButton';
import { ShareButton } from './ShareButton';
import { TweetImages } from './TweetImages';
import { UserHeader } from './UserHeader';
import { CustomModal, TweetForm } from '../shared';
import { useModal } from '../shared/hooks/useModal';

export const Tweet = ({ tweet }) => {
  const { open, handleOpen, handleClose } = useModal(false);
  const history = useHistory();

  const goToTweetDetails = () => {
    history.push(`/${tweet.user.username}/status/${tweet.id}`);
  };

  return (
    <Stack
      component="article"
      direction="row"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: 'background.hover',
          cursor: 'pointer',
          transition: 'background-color 0.1s ease-in-out',
        },
      }}
    >
      <Stack p={2} onClick={goToTweetDetails}>
        <Avatar
          src={tweet.user.avatar.url}
          alt={`${tweet.user.name}`}
          component={Link}
          to={`/${tweet.user.username}`}
          onClick={(e) => e.stopPropagation()}
        />
      </Stack>

      <Stack py={2} pr={2} sx={{ width: '100%' }} onClick={goToTweetDetails}>
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
            <ReplyButton replies={tweet.replies} handleClick={handleOpen} />

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

            <LikeButton tweetId={tweet?.id} likes={tweet?.likes} showCount />

            <ShareButton />
          </Stack>
        </Stack>
      </Stack>
      <CustomModal open={open} handleClose={handleClose}>
        <TweetForm
          tweet={tweet}
          fileInputId={`reply-file-input-${tweet.id}`}
          handleClose={handleClose}
        />
      </CustomModal>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
