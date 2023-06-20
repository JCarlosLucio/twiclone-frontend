import { useSnackbar } from 'notistack';

// Must be imported at least once in the app to initialize the ref
let snackbarRef;
export const SnackbarUtilsConfigurator = () => {
  snackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'warning' });
  },
  info(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'info' });
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'error' });
  },
  toast(msg, options = {}) {
    snackbarRef.enqueueSnackbar(msg, options);
  },
};
