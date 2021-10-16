import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';

export const TopBar = ({ children, barClick, justifyContent, padding }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (barClick) {
      barClick();
    }
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
      <Toolbar
        disableGutters
        sx={{
          justifyContent: justifyContent || 'flex-start',
          padding: padding || '0 15px',
          minHeight: '53px !important',
        }}
      >
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
};
