import { Loading } from '../shared';
import { useWhoToFollow } from './hooks/useWhoToFollow';

export const WhoToFollow = () => {
  const { users, isLoading } = useWhoToFollow();

  if (isLoading) return <Loading />;

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};
