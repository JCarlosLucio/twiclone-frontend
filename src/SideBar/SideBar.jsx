import { useContext } from 'react';
import {
  BsCheck2,
  BsHouse,
  BsHouseFill,
  BsThreeDots,
  BsTornado,
} from 'react-icons/bs';
import {
  FaBell,
  FaEllipsisH,
  FaHashtag,
  FaRegBell,
  FaRegUser,
  FaUser,
} from 'react-icons/fa';
import { RiHashtag } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CustomModal, TweetForm, UserHeader } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';
import { usePopover } from '../shared/hooks/usePopover';
import { ColorModeContext } from '../utils/ColorModeProvider';
import { NavButton } from './NavButton';

export const SideBar = () => {
  const { me, clearUser } = useMe();
  const { open, openModal, closeModal } = useModal(false);
  const { anchorEl, openPopover, closePopover, id } = usePopover(
    null,
    'me-popover'
  );
  const colorMode = useContext(ColorModeContext);

  const logout = () => {
    clearUser();
  };

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
        <Box>
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
          <Button color="secondary" size="large" startIcon={<FaEllipsisH />}>
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

      <Button
        onClick={openPopover}
        color="secondary"
        size="large"
        startIcon={<Avatar src={me.avatar.url} alt={`${me.name}`} />}
        endIcon={
          <Stack ml={4}>
            <BsThreeDots fontSize="medium" />
          </Stack>
        }
        sx={{ marginBottom: 1.5 }}
      >
        <UserHeader user={me} direction="column" />
      </Button>
      <Menu
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Stack direction="row" alignItems="center" spacing={2} p={2}>
          <Avatar src={me.avatar.url} alt={`${me.name}`} />
          <UserHeader user={me} direction="column" />
          <Typography color="primary">
            <BsCheck2 fontSize="large" />
          </Typography>
        </Stack>
        <Divider />
        <MenuItem onClick={logout}>Log out {`@${me.username}`}</MenuItem>
      </Menu>
      <CustomModal open={open} handleClose={closeModal}>
        <TweetForm fileInputId="modal-file-input" handleClose={closeModal} />
      </CustomModal>
    </Stack>
  );
};
