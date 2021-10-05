import { QueryClient } from 'react-query';
import SnackbarUtils from './SnackbarUtils';

const queryErrorHandler = (error) => {
  const errorMessage =
    error?.response?.data?.error ||
    // remove the initial 'Error: ' that accompanies many errors
    error.toString().replace(/^Error:\s*/, '') ||
    'error connecting to server';

  SnackbarUtils.error(errorMessage);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      notifyOnChangeProps: 'tracked',
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
