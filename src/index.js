import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';
import { queryClient } from './utils/query-client';
import { SnackbarUtilsConfigurator } from './utils/SnackbarUtils';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <SnackbarUtilsConfigurator />
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
