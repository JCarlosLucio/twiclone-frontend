import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ColorModeProvider from './utils/ColorModeProvider';
import { queryClient } from './utils/queryClient';
import { SnackbarUtilsConfigurator } from './utils/SnackbarUtils';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <SnackbarUtilsConfigurator />
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ColorModeProvider>
  </React.StrictMode>,
);
