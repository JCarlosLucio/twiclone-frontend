import { useContext } from 'react';
import { BsHouse, BsThreeDots, BsTornado } from 'react-icons/bs';
import { FaRegBell, FaHashtag, FaEllipsisH, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { CustomModal, TweetForm, UserHeader } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';
import { usePopover } from '../shared/hooks/usePopover';
import { ColorModeContext } from '../utils/ColorModeProvider';

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
          alignItems="flex-start"
          spacing={2}
          sx={{
            '& a, & button': {
              fontSize: 20,
              fontWeight: 400,
            },
          }}
        >
          <Button
            component={Link}
            to={'/home'}
            color="secondary"
            size="large"
            startIcon={<BsHouse />}
          >
            Home
          </Button>
          <Button color="secondary" size="large" startIcon={<FaHashtag />}>
            Explore
          </Button>
          <Button color="secondary" size="large" startIcon={<FaRegBell />}>
            Notifications
          </Button>
          <Button
            component={Link}
            to={`/${me.username}`}
            color="secondary"
            size="large"
            startIcon={<FaRegUser />}
          >
            Profile
          </Button>
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
      <Popover
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Popover>
      <CustomModal open={open} handleClose={closeModal}>
        <TweetForm fileInputId="modal-file-input" handleClose={closeModal} />
      </CustomModal>
    </Stack>
  );
};
