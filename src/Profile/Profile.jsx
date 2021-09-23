import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { getUser } from '../services/user';
import { queryKeys } from '../constants';

export const Profile = () => {
  const { username } = useParams();
  const { goBack } = useHistory();
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery([queryKeys.user, username], () => getUser(username));

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
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>{`@${user.username}`}</h3>
    </div>
  );
};
