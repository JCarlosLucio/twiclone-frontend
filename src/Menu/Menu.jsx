import { useMe } from '../shared/hooks/useMe';

export const Menu = () => {
  const { me, clearUser } = useMe();

  const logout = () => {
    clearUser();
  };

  return (
    <div>
      <h1>Twiclone</h1>
      {me && (
        <div>
          {me.name}
          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  );
};
