import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { getUser } from '../services/user';
import { queryKeys } from '../constants';
import { EditProfile } from './EditProfile';

export const Profile = () => {
  const { username } = useParams();
  const { goBack } = useHistory();
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery([queryKeys.user, username], () => getUser(username));

  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(queryKeys.me);

  const isMe = me.id === user?.id;

  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
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

  return (
    <div>
      <button onClick={goBack}>back</button>
      <img
        style={{ width: 40 }}
        src={user.avatar.url}
        alt={`${user.name} avatar`}
      />
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>{`@${user.username}`}</h3>
      {isMe && <button onClick={toggleEditForm}>Edit Profile</button>}
      {showEditForm && <EditProfile me={me} />}
    </div>
  );
};
