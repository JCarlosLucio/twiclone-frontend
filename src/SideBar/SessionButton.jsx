import { BsCheck2, BsThreeDots } from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserHeader } from '../shared';
import { useMe } from '../shared/hooks/useMe';
import { usePopover } from '../shared/hooks/usePopover';

export const SessionButton = () => {
  const { me, clearUser } = useMe();
  const { anchorEl, openPopover, closePopover, id } = usePopover(
    null,
    'me-popover'
  );
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const logout = () => {
    clearUser();
  };

  return (
    <>
      {matches ? (
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
      ) : (
        <IconButton onClick={openPopover} color="secondary" size="large">
          <Avatar src={me.avatar.url} alt={`${me.name}`} />
        </IconButton>
      )}
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
    </>
  );
};
