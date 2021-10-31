import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Loading, UserHeader } from '../shared';
import { useWhoToFollow } from './hooks/useWhoToFollow';

export const WhoToFollow = () => {
  const { users, isLoading } = useWhoToFollow();

  if (isLoading) return <Loading />;

  return (
    <List
      sx={{ maxWidth: 350, borderRadius: '1rem' }}
      subheader={
        <ListSubheader component="div" sx={{ px: 2, py: 0.5 }}>
          <Typography variant="h6">Who to follow</Typography>
        </ListSubheader>
      }
    >
      {users.map((user) => (
        <ListItemButton key={user?.id}>
          <ListItemAvatar>
            <Avatar src={user?.avatar?.url} alt={`${user?.name}`} />
          </ListItemAvatar>
          <ListItemText>
            <UserHeader user={user} direction="column" withLink />
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};
