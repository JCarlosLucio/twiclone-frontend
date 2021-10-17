import { useState } from 'react';
import { BsArrowLeft, BsCalendar3 } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EditProfile } from './EditProfile';
import { TopBar } from '../shared';
import { useFollow } from '../shared/hooks/useFollow';
import { useMe } from '../shared/hooks/useMe';
import { useUser } from '../shared/hooks/useUser';
import { dateMonthYear } from '../utils/date';

export const Profile = () => {
  const { username } = useParams();
  const { goBack } = useHistory();
  const { me } = useMe();
  const { user, isLoading, isError, error } = useUser(username);
  const { follow, isFollowing } = useFollow(user);

  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleFollow = () => {
    follow(user?.id);
  };

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  if (!user) {
    return (
      <div>
        <h3>{`@${username}`}</h3>
        <h3>This account doesn&apos;t exist</h3>
        <p>Try searching for another</p>
      </div>
    );
  }

  const isMe = me.id === user?.id;
  const following = me.following.includes(user?.id);

  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
      }}
    >
      <TopBar>
        <IconButton
          size="small"
          color="secondary"
          edge="start"
          onClick={goBack}
        >
          <BsArrowLeft fontSize="large" />
        </IconButton>

        <Stack ml={3}>
          <Typography variant="h6" fontWeight="700" lineHeight={1.2}>
            {user ? user.username : 'Profile'}
          </Typography>
          {user && (
            <Typography variant="caption" color="text.secondary">
              33 Tweets
            </Typography>
          )}
        </Stack>
      </TopBar>

      <Stack>
        <Stack>
          <Stack
            sx={{
              height: '100%',
              backgroundImage: () =>
                user?.banner?.url ? `url(${user?.banner?.url})` : 'none',
              backgroundColor: 'backdrop',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Stack sx={{ pb: '190px' }}></Stack>
          </Stack>
        </Stack>

        <Stack px={2} pt={1.25}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Avatar
              size="large"
              src={user?.avatar?.url}
              alt={`${user?.name} avatar`}
              sx={{
                mt: '-80px',
                border: '4px solid',
                borderColor: 'background.default',
                backgroundColor: 'divider',
              }}
            />
            {user ? (
              isMe ? (
                <Button
                  variant="secondary"
                  onClick={toggleEditForm}
                  sx={{ border: '1px solid', borderColor: 'secondary' }}
                >
                  Edit profile
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleFollow}
                  sx={{ border: '1px solid', borderColor: 'secondary' }}
                >
                  {(isFollowing && 'Following...') ||
                    (following && 'Following') ||
                    'Follow'}
                </Button>
              )
            ) : null}
          </Stack>

          <Stack spacing={2}>
            <Stack>
              <Typography variant="h6" fontWeight="700">
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                lineHeight={0.8}
              >{`@${user.username}`}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Stack color="text.secondary">
                <BsCalendar3 />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {`Joined ${dateMonthYear(user?.createdAt)}`}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography fontWeight="700">
                  {user.followers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography fontWeight="700">
                  {user.following.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {showEditForm && <EditProfile me={me} />}
      </Stack>
    </Stack>
  );
};
