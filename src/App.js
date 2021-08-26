import { useQueryClient } from 'react-query';
import { Switch, Route } from 'react-router-dom';
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

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      <h1>Twiclone Frontend</h1>
      {user && (
        <div>
          {user.name}
          <button onClick={logout}>logout</button>
        </div>
      )}
      <Switch>
        <Route path="/">
          <Feed />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
