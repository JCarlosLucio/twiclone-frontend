import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Button from '@mui/material/Button';

export const NavButton = ({ children, to, startIcon, activeIcon }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
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
  );
};
