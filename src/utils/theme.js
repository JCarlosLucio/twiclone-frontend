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
  divider: '#eff3f4',
  text: {
    primary: grey[900],
    secondary: '#536471',
  },
};

const darkTheme = {
  // palette values for dark mode
  primary: blue,
  secondary: grey,
  divider: '#2f3336',
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
    borderRadius: 16,
  },
  palette: {
    action: {
      disabledBackground: 'rgba(33, 150, 243,0.5)',
    },
    mode,
    ...(mode === 'light' ? lightTheme : darkTheme),
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
          fontWeight: 700,
        },
        sizeSmall: {
          padding: '6px 18px',
        },
        sizeLarge: {
          padding: '8px 16px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          fontSize: '1rem',
          padding: '10px',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'h2',
          subtitle2: 'span',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
