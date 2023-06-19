import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Info } from './Info';
import { useMe } from './shared/hooks/useMe';
import { SideBar } from './SideBar';

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
        xl={4}
        lg={3}
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
      <Grid component="main" item xl={4} lg={5} md={8} sm={10} xs={12}>
        <Outlet />
      </Grid>

      {matches && (
        <Grid item xl={4} lg={3} md={0} sm={0} xs={0}>
          <Info />
        </Grid>
      )}
    </Grid>
  );
};
