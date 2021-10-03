import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { useMe } from '../shared/hooks/useMe';
import { ColorModeContext } from '../utils/ColorModeProvider';

export const Menu = () => {
  const { me, clearUser } = useMe();
  const colorMode = useContext(ColorModeContext);

  const logout = () => {
    clearUser();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        position: 'fixed',
        width: '275px',
      }}
    >
      <Container
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <IconButton>A</IconButton>
        </Box>
        <Container
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            '& button': {
              fontSize: 20,
              p: 1,
              m: '8px',
              textTransform: 'capitalize',
            },
          }}
        >
          <Button color="secondary">Home</Button>
          <Button color="secondary">Explore</Button>
          <Button color="secondary">Notifications</Button>
          <Button color="secondary">Profile</Button>
          <Button color="secondary">More</Button>
          <Button onClick={colorMode.toggleColorMode}>
            toggle {colorMode.mode}
          </Button>
        </Container>

        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: 20,
            p: 1,
            m: '8px',
            textTransform: 'capitalize',
          }}
        >
          Tweet
        </Button>
      </Container>

      <Container>
        {me && (
          <div>
            {me.name}
            <Button variant="contained" onClick={logout}>
              logout
            </Button>
          </div>
        )}
      </Container>
    </Container>
  );
};
