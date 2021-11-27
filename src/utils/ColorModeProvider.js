import { createContext, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext({
  mode: '',
  setMode: () => {},
});

const ColorModeProvider = ({ children }) => {
  // State to hold the selected theme name
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      mode,
      // The dark mode switch would invoke this method
      setMode,
    }),
    [mode]
  );
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
