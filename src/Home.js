import { Navigate, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { SideBar } from './SideBar';
import { useMe } from './shared/hooks/useMe';
import { Info } from './Info';

export const Home = () => {
  const { me } = useMe();

  if (!me) {
    return <Navigate to="/auth" />;
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
        <SideBar />
      </Grid>
      <Grid component="main" item lg={4}>
        <Outlet />
      </Grid>
      <Grid item lg={4}>
        <Info />
      </Grid>
    </Grid>
  );
};
