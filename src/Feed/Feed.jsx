import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useQueryClient } from '@tanstack/react-query';
import { BsStars } from 'react-icons/bs';
import { FiFeather } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { queryKeys } from '../constants';
import { CustomDrawer, TopBar, TweetForm, TweetList } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';

export const Feed = () => {
  const { me } = useMe();
  const { open, openModal: openDrawer, closeModal: closeDrawer } = useModal();
  const queryClient = useQueryClient();
  const refetchTweets = async () => {
    await queryClient.refetchQueries([queryKeys.tweets], { active: true });
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const goToComposeTweet = () => {
    navigate('/compose/tweet');
  };

  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
      }}
    >
      <TopBar
        barClick={refetchTweets}
        justifyContent="space-between"
        padding="0 10px 0 16px"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {!matches && (
            <Avatar
              onClick={openDrawer}
              size="small"
              src={me.avatar.url}
              alt={`${me.name}`}
            />
          )}

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Home
          </Typography>
        </Stack>
        <IconButton size="small" color="secondary" edge="end">
          <BsStars />
        </IconButton>
      </TopBar>

      {matches && <TweetForm fileInputId="feed-file-input" />}

      <TweetList />

      {!matches && (
        <>
          <Fab
            color="primary"
            size="large"
            sx={{ position: 'fixed', bottom: 20, right: 20 }}
            onClick={goToComposeTweet}
          >
            <FiFeather fontSize={28} />
          </Fab>
          <CustomDrawer
            open={open}
            handleOpen={openDrawer}
            handleClose={closeDrawer}
          />
        </>
      )}
    </Stack>
  );
};
