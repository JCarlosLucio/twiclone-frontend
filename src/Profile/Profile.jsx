import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Stack from '@mui/material/Stack';
import { EditProfile } from './EditProfile';
import { useFollow } from '../shared/hooks/useFollow';
import { useMe } from '../shared/hooks/useMe';
import { useUser } from '../shared/hooks/useUser';

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
      <button onClick={goBack}>back</button>
      <img
        style={{ width: 40 }}
        src={user.avatar.url}
        alt={`${user.name} avatar`}
      />
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>{`@${user.username}`}</h3>
      <h2>{`${user.following.length} Following   ${user.followers.length} Followers`}</h2>
      {isMe ? (
        <button onClick={toggleEditForm}>Edit Profile</button>
      ) : (
        <button onClick={handleFollow}>
          {isFollowing ? 'Following...' : following ? 'Following' : 'Follow'}
        </button>
      )}
      {showEditForm && <EditProfile me={me} />}
    </Stack>
  );
};
