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
  background: {
    hover: 'rgba(0, 0, 0, 0.03)',
    secondary: 'rgb(247, 249, 249)',
  },
  divider: '#eff3f4',
  text: {
    primary: grey[900],
    secondary: '#536471',
  },
  backdrop: 'rgba(0, 0, 0, 0.4)',
};

const darkTheme = {
  // palette values for dark mode
  primary: blue,
  secondary: grey,
  divider: '#2f3336',
  background: {
    default: '#000',
    paper: '#000',
    hover: 'rgba(255, 255, 255, 0.03)',
    secondary: 'rgb(21, 24, 28)',
  },
  text: {
    primary: '#d9d9d9',
    secondary: '#6e767d',
  },
  backdrop: 'rgba(91, 112, 131, 0.4)',
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
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
        color: 'background',
        elevation: 0,
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,
        },
      },
      variants: [
        {
          props: { size: 'large' },
          style: {
            width: 140,
            height: 140,
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
          fontWeight: 700,
        },
        contained: {
          '&:disabled, &.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
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
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundImage: 'none',
          },
        },
        container: {
          alignItems: 'flex-start',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:disabled, &.Mui-disabled': {
            color: 'rgba(33, 150, 243,0.5)',
          },
        },
        sizeSmall: {
          fontSize: '1rem',
          padding: '10px',
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            boxShadow:
              mode === 'light'
                ? 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
                : 'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 2,
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
