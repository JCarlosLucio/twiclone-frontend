import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SideBar } from './SideBar';
import { useMe } from './shared/hooks/useMe';
import { Info } from './Info';

export const Home = () => {
  const { me } = useMe();
  const location = useLocation();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  if (!me) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid
        component="header"
        item
        lg={4}
        md={2}
        sm={2}
        xs={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minHeight: '100%',
          positon: 'relative',
        }}
      >
        <SideBar />
      </Grid>
      <Grid component="main" item lg={4} md={8} sm={10} xs={12}>
        <Outlet />
      </Grid>

      {matches && (
        <Grid item lg={4} md={0} sm={0} xs={0}>
          <Info />
        </Grid>
      )}
    </Grid>
  );
};
