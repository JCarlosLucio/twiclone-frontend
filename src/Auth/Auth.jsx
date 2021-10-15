import { useState } from 'react';
import { BsTornado } from 'react-icons/bs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = () => {
  const [mode, setMode] = useState('login');

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={0}
        sm={3}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={9} md={5}>
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
            {mode === 'login' && (
              <>
                <Login />
                <p>
                  Don’t have an account?
                  <button onClick={() => setMode('register')}>Register</button>
                </p>
              </>
            )}
            {mode === 'register' && (
              <>
                <Register />
                <p>
                  Already have an account?
                  <button onClick={() => setMode('login')}>Log in</button>
                </p>
              </>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
