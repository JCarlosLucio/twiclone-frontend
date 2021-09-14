import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getUser } from '../services/user';

export const Profile = () => {
  const { username } = useParams();
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery(['user', { username }], getUser);

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
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>{`@${user.username}`}</h3>
    </div>
  );
};