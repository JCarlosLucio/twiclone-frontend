import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';
import ColorModeProvider from './utils/ColorModeProvider';
import { queryClient } from './utils/query-client';
import { SnackbarUtilsConfigurator } from './utils/SnackbarUtils';
import App from './App';

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
