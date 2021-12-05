import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { BackButton } from './BackButton';

export const TopBar = ({
  children,
  barClick,
  justifyContent = 'flex-start',
  padding = '0 15px',
  withBackButton = false,
}) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    barClick && barClick();
  };

  return (
    <AppBar
      component="div"
      position="sticky"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Toolbar disableGutters sx={{ justifyContent, padding }}>
        {withBackButton && <BackButton />}
        {children}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
  barClick: PropTypes.func,
  justifyContent: PropTypes.string,
  padding: PropTypes.string,
  withBackButton: PropTypes.bool,
};
