import { useQuery, useQueryClient } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import { Auth } from './Auth';
import { Feed } from './Feed';
import { Profile } from './Profile';
import { getMe } from './services/auth';
import storage from './utils/storage';
import { queryKeys } from './constants';

const App = () => {
  const queryClient = useQueryClient();
  const {
    data: user = storage.loadUser(),
    error,
    isLoading,
    isError,
  } = useQuery(queryKeys.me, getMe);

  const logout = () => {
    storage.clearUser();
    queryClient.resetQueries(queryKeys.me);
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
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
