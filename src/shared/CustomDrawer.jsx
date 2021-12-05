import { FaHashtag, FaPaintBrush, FaRegUser } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { useMe } from '../shared/hooks/useMe';

export const CustomDrawer = ({ open, handleOpen, handleClose }) => {
  const { me, clearUser } = useMe();

  const logout = () => clearUser();

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: (theme) => theme.palette.backdrop,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p="0.5rem 0.5rem 0.5rem 1rem"
      >
        <Typography variant="h6">Account Info</Typography>
        <IconButton onClick={handleClose}>
          <BsX />
        </IconButton>
      </Stack>
      <Divider />
      <Stack px={2} pt={2}>
        <Stack spacing={1}>
          <Avatar
            src={me.avatar.url}
            alt={`${me.name}`}
            component={Link}
            to={`/${me.username}`}
            size="medium"
          />
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {me.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={0.8}
            >{`@${me.username}`}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3} pt={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography fontWeight="700">{me?.followers?.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Followers
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography fontWeight="700">{me?.following?.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Following
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <List>
        <ListItem
          component={Link}
          to={`/${me.username}`}
          sx={{ color: 'text.primary' }}
        >
          <ListItemIcon>
            <FaRegUser />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/explore" sx={{ color: 'text.primary' }}>
          <ListItemIcon>
            <FaHashtag />
          </ListItemIcon>
          <ListItemText>Explore</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <FaPaintBrush />
          </ListItemIcon>
          <ListItemText>Display</ListItemText>
        </ListItem>
        <Divider />
        <ListItem onClick={logout}>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};
