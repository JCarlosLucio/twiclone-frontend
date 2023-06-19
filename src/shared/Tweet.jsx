import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { CustomModal, TweetForm } from '../shared';
import { useModal } from '../shared/hooks/useModal';
import { LikeButton } from './LikeButton';
import { ReplyButton } from './ReplyButton';
import { RetweetButton } from './RetweetButton';
import { ShareButton } from './ShareButton';
import { TweetImages } from './TweetImages';
import { UserHeader } from './UserHeader';

export const Tweet = ({ tweet }) => {
  const { open, openModal, closeModal } = useModal(false);
  const navigate = useNavigate();

  const goToTweetDetails = () => {
    navigate(`/${tweet.user.username}/status/${tweet.id}`);
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

          <Stack direction="row" justifyContent="space-around">
            <ReplyButton replies={tweet.replies} handleClick={openModal} />
            <RetweetButton />
            <LikeButton tweetId={tweet?.id} likes={tweet?.likes} showCount />
            <ShareButton
              tweetId={tweet.id}
              tweetUsername={tweet.user.username}
            />
          </Stack>
        </Stack>
      </Stack>
      <CustomModal open={open} handleClose={closeModal}>
        <TweetForm
          tweet={tweet}
          fileInputId={`reply-file-input-${tweet.id}`}
          handleClose={closeModal}
          showParent
        />
      </CustomModal>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
