import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { followUser, getUser } from '../services/user';
import { queryKeys } from '../constants';
import { EditProfile } from './EditProfile';
import { useMe } from '../shared/hooks/useMe';

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
  const { me } = useMe();

  const { mutate, isLoading: isMutating } = useMutation(followUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.me, {
        ...data.updatedMe,
        token: me.token,
      });
      queryClient.setQueryData(
        [queryKeys.user, user.username],
        data.updatedUser
      );
      // needs to invalidate/refetch tweets(?)
    },
  });

  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleFollow = () => {
    mutate(user?.id);
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
      <h2>{`${user.following.length} Following   ${user.followers.length} Followers`}</h2>
      {isMe ? (
        <button onClick={toggleEditForm}>Edit Profile</button>
      ) : (
        <button onClick={handleFollow}>
          {isMutating ? 'Following...' : following ? 'Following' : 'Follow'}
        </button>
      )}
      {showEditForm && <EditProfile me={me} />}
    </div>
  );
};
