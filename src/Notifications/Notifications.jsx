import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { TopBar } from '../shared';

export const Notifications = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
      }}
    >
      <TopBar withBackButton>
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            lineHeight={1.2}
            noWrap
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Notifications
          </Typography>
        </Stack>
      </TopBar>

      <Stack
        justifyContent="start"
        alignItems="center"
        pt={matches ? 24 : 16}
        sx={{ flex: 1 }}
      >
        <Stack justifyContent="center" alignItems="center" spacing={4}>
          <FaBell size={96} />
          <Typography
            variant="h5"
            fontWeight="700"
            lineHeight={1.2}
            noWrap
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            You have no notifications.
          </Typography>
          <Button
            component={Link}
            to="/home"
            variant="outlined"
            color="secondary"
            size="large"
          >
            Go Home
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
