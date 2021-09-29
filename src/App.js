import { Switch, Route } from 'react-router-dom';
import { Auth } from './Auth';
import { Feed } from './Feed';
import { Profile } from './Profile';
import { useMe } from './shared/hooks/useMe';

const App = () => {
  const { me, clearUser } = useMe();

  const logout = () => {
    clearUser();
  };

  if (!me) {
    return <Auth />;
  }

  return (
    <div>
      <h1>Twiclone Frontend</h1>
      {me && (
        <div>
          {me.name}
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
