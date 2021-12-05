import { FaHashtag, FaPaintBrush, FaRegUser } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
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
      <List sx={{ maxWidth: '70%', minWidth: '280px' }}>
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
