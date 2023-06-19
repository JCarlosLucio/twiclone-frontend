import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const NavButton = ({ children, to, startIcon, activeIcon }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return matches ? (
    <Button
      component={Link}
      to={to}
      color="secondary"
      size="large"
      startIcon={match ? activeIcon : startIcon}
      sx={{
        fontWeight: match ? 700 : 400,
      }}
    >
      {children}
    </Button>
  ) : (
    <IconButton component={Link} to={to} color="secondary" size="large">
      {match ? activeIcon : startIcon}
    </IconButton>
  );
};
