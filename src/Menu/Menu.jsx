import { useContext } from 'react';
import { BsHouse, BsTornado } from 'react-icons/bs';
import { FaRegBell, FaHashtag, FaEllipsisH, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { CustomModal, TweetForm } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { useModal } from '../shared/hooks/useModal';
import { ColorModeContext } from '../utils/ColorModeProvider';

export const Menu = () => {
  const { me, clearUser } = useMe();
  const { open, handleOpen, handleClose } = useModal(false);
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
            onClick={handleOpen}
            size="large"
            variant="contained"
            fullWidth
          >
            Tweet
          </Button>
        </Stack>
      </Stack>

      <CustomModal open={open} handleClose={handleClose}>
        <TweetForm fileInputId="modal-file-input" handleClose={handleClose} />
      </CustomModal>

      {me && (
        <div>
          {me.name}
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </Stack>
  );
};
