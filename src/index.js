import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ColorModeProvider from './utils/ColorModeProvider';
import { queryClient } from './utils/query-client';
import { SnackbarUtilsConfigurator } from './utils/SnackbarUtils';

ReactDOM.render(
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
  document.getElementById('root'),
);
