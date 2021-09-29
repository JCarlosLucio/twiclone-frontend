import { Switch, Route } from 'react-router-dom';
import { Auth } from './Auth';
import { Feed } from './Feed';
import { Menu } from './Menu';
import { Profile } from './Profile';
import { useMe } from './shared/hooks/useMe';

const App = () => {
  const { me } = useMe();

  if (!me) {
    return <Auth />;
  }

  return (
    <div>
      <Menu />
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
