import { amber, blue, grey } from '@mui/material/colors';

const lightTheme = {
  // palette values for light mode
  primary: amber,
  divider: amber[200],
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
};

const darkTheme = {
  // palette values for dark mode
  primary: blue,
  divider: blue[700],
  background: {
    default: '#001E3C',
    paper: '#0A1929',
  },
  text: {
    primary: '#fff',
    secondary: grey[500],
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
});
