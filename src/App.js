import { useQueryClient } from 'react-query';
import { Feed } from './Feed';
import { Auth } from './Auth';
import storage from './utils/storage';
import { useQuery } from 'react-query';
import { getCurrentUser } from './services/user';

const App = () => {
  const queryClient = useQueryClient();
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery('currentUser', getCurrentUser, { initialData: null });

  const logout = () => {
    storage.clearUser();
    queryClient.resetQueries('currentUser');
  };

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Twiclone Frontend</h1>
      <button onClick={logout}>logout</button>
      {!user && <p>PLEASE LOGIN!</p>}
      <Auth />
      <Feed />
    </div>
  );
};

export default App;
