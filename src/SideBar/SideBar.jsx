import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BsHouse, BsHouseFill, BsTornado } from 'react-icons/bs';
import {
  FaBell,
  FaHashtag,
  FaRegBell,
  FaRegUser,
  FaUser,
} from 'react-icons/fa';
import { FiFeather } from 'react-icons/fi';
import { RiHashtag } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { CustomModal, TweetForm } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';
import { MoreButton } from './MoreButton';
import { NavButton } from './NavButton';
import { SessionButton } from './SessionButton';

export const SideBar = () => {
  const { me } = useMe();
  const { open, openModal, closeModal } = useModal(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Stack
      justifyContent="space-between"
      alignItems={matches ? 'flex-end' : 'flex-end'}
      sx={{
        position: 'fixed',
        height: '100%',
        p: '0 1rem',
      }}
    >
      <Stack spacing={2} sx={{ width: matches ? '100%' : 'auto' }}>
        <Box pt={1}>
          <IconButton
            component={Link}
            to={'/home'}
            color="secondary"
            size="large"
          >
            <BsTornado />
          </IconButton>
        </Box>
        <Stack
          component="nav"
          alignItems={matches ? 'flex-start' : 'center'}
          spacing={2}
          sx={{
            '& a, & button': {
              fontSize: 20,
            },
          }}
        >
          <NavButton
            to="/home"
            startIcon={<BsHouse />}
            activeIcon={<BsHouseFill />}
          >
            Home
          </NavButton>
          <NavButton
            to="/explore"
            startIcon={<RiHashtag />}
            activeIcon={<FaHashtag />}
          >
            Explore
          </NavButton>
          <NavButton
            to="/notifications"
            startIcon={<FaRegBell />}
            activeIcon={<FaBell />}
          >
            Notifications
          </NavButton>
          <NavButton
            to={`/${me.username}`}
            startIcon={<FaRegUser />}
            activeIcon={<FaUser />}
          >
            Profile
          </NavButton>

          <MoreButton />

          {matches ? (
            <Button
              onClick={openModal}
              size="large"
              variant="contained"
              fullWidth
            >
              Tweet
            </Button>
          ) : (
            <IconButton
              onClick={openModal}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
              }}
            >
              <FiFeather fontSize={34} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <SessionButton />

      <CustomModal open={open} handleClose={closeModal}>
        <TweetForm fileInputId="modal-file-input" handleClose={closeModal} />
      </CustomModal>
    </Stack>
  );
};
