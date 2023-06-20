import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { BsTornado } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';

import { useMe } from '../shared/hooks/useMe';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = () => {
  const [mode, setMode] = useState('login');
  const { me } = useMe();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  if (me) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        sm={3}
        md={7}
        lg={8}
        sx={{
          backgroundImage: 'url(https://picsum.photos/1200/1000)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={9} md={5} lg={4}>
        <Stack justifyContent="center" sx={{ height: '100vh' }}>
          <Stack p={5}>
            <Box sx={{ fontSize: '3rem' }}>
              <BsTornado />
            </Box>

            <Typography
              variant="h2"
              my={5}
              sx={{
                fontWeight: 700,
                letterSpacing: 3,
              }}
            >
              Happening now
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {mode === 'login' ? 'Log in to Twiclone' : 'Join Twiclone today.'}
            </Typography>

            {mode === 'login' ? <Login /> : <Register />}

            <Stack direction="row" spacing={1}>
              <Typography>
                {mode === 'login'
                  ? 'Don’t have an account?'
                  : 'Already have an account?'}
              </Typography>

              <Typography
                color="primary"
                onClick={toggleMode}
                sx={{ cursor: 'pointer' }}
              >
                {mode === 'login' ? 'Register' : 'Log in'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
