import { Switch, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
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
    <Grid container justifyContent="center">
      <Grid
        component="header"
        item
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minHeight: '100%',
          positon: 'relative',
        }}
      >
        <Menu />
      </Grid>
      <Grid component="main" item lg={4}>
        <Switch>
          <Route exact path={['/', '/home']} component={Feed} />
          <Route path="/:username" component={Profile} />
        </Switch>
      </Grid>
      <Grid item lg={4}>
        <h1>News</h1>
      </Grid>
    </Grid>
  );
};

export default App;
