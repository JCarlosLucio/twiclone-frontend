import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useWhoToFollow } from './hooks/useWhoToFollow';
import { FollowButton, Loading, UserHeader } from '../shared';

export const WhoToFollow = () => {
  const { users, isLoading } = useWhoToFollow();
  const history = useHistory();

  if (isLoading) return <Loading />;

  return (
    <List
      sx={{
        bgcolor: 'background',
        maxWidth: 350,
        borderRadius: '1rem',
        '& .MuiListItem-root:hover': {
          bgcolor: 'background.hover',
          cursor: 'pointer',
        },
      }}
      aria-label="who to follow"
      subheader={
        <ListSubheader sx={{ px: 2, py: 0.5 }}>
          <Typography variant="h6">Who to follow</Typography>
        </ListSubheader>
      }
    >
      {users.map((user) => (
        <ListItemButton
          key={user?.id}
          onClick={() => history.push(`/${user?.username}`)}
          secondaryAction={<FollowButton user={user} variant="contained" />}
        >
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
