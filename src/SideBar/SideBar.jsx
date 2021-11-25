import { useContext } from 'react';
import { BsHouse, BsHouseFill, BsTornado } from 'react-icons/bs';
import {
  FaBell,
  FaHashtag,
  FaRegBell,
  FaRegUser,
  FaUser,
} from 'react-icons/fa';
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import { RiHashtag } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { CustomModal, TweetForm } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';
import { ColorModeContext } from '../utils/ColorModeProvider';
import { NavButton } from './NavButton';
import { SessionButton } from './SessionButton';

export const SideBar = () => {
  const { me } = useMe();
  const { open, openModal, closeModal } = useModal(false);

  const colorMode = useContext(ColorModeContext);

  return (
    <Stack
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{
        position: 'fixed',
        height: '100%',
        width: '275px',
        p: '0 1rem',
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
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
          alignItems="flex-start"
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
          <Button
            color="secondary"
            size="large"
            startIcon={<IoEllipsisHorizontalCircle />}
            sx={{ fontWeight: 400 }}
          >
            More
          </Button>
          <Button onClick={colorMode.toggleColorMode}>
            toggle {colorMode.mode}
          </Button>
          <Button
            onClick={openModal}
            size="large"
            variant="contained"
            fullWidth
          >
            Tweet
          </Button>
        </Stack>
      </Stack>

      <SessionButton />

      <CustomModal open={open} handleClose={closeModal}>
        <TweetForm fileInputId="modal-file-input" handleClose={closeModal} />
      </CustomModal>
    </Stack>
  );
};
