import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export const Loading = () => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ padding: '16px' }}>
      <CircularProgress />
    </Stack>
  );
};
