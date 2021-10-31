import Stack from '@mui/material/Stack';
import { WhoToFollow } from './WhoToFollow';

export const Info = () => {
  return (
    <Stack
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        position: 'fixed',
        height: '100%',
        width: '350px',
        p: '0 1rem',
      }}
    >
      <WhoToFollow />
    </Stack>
  );
};
