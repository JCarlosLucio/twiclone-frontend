import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';

const lightTheme = {
  // palette values for light mode
  primary: blue,
  secondary: {
    main: grey[900],
    light: grey[500],
    dark: grey[900],
  },
  divider: blue[200],
  text: {
    primary: grey[900],
    secondary: grey[900],
  },
};

const darkTheme = {
  // palette values for dark mode
  primary: blue,
  secondary: grey,
  divider: blue[700],
  background: {
    default: '#000',
    paper: '#000',
  },
  text: {
    primary: '#d9d9d9',
    secondary: '#6e767d',
  },
};

export const getDesignTokens = (mode) => ({
  shape: {
    borderRadius: 50,
  },
  palette: {
    mode,
    ...(mode === 'light' ? lightTheme : darkTheme),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
  },
});
