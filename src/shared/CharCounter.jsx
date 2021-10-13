import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const CharCounter = ({ count }) => {
  const MAX_COUNT = 280;
  const WARN_THRESHOLD = 20;
  const diffCount = MAX_COUNT - count;

  const showText = diffCount <= WARN_THRESHOLD;
  const textColor = diffCount < 1 ? 'error' : 'text.secondary';
  const textValue = diffCount;

  const wheelSize = diffCount > WARN_THRESHOLD ? 20 : 30;
  const wheelThickness = diffCount > WARN_THRESHOLD ? 4 : 3;
  const wheelColor =
    (diffCount < 1 && 'error') ||
    (diffCount <= WARN_THRESHOLD && 'warning') ||
    (diffCount > WARN_THRESHOLD && 'primary');
  const wheelValue = diffCount < 1 ? 100 : (count * 100) / MAX_COUNT;
  const wheelVisibility = diffCount > -10 ? 'visible' : 'hidden';

  return (
    <Stack sx={{ position: 'relative' }}>
      {showText && (
        <Typography
          variant="caption"
          align="center"
          color={textColor}
          sx={{ position: 'absolute', left: 10, top: 6 }}
        >
          {textValue}
        </Typography>
      )}

      <CircularProgress
        variant="determinate"
        size={wheelSize}
        thickness={wheelThickness}
        value={100}
        sx={{
          position: 'absolute',
          left: 0,
          color: (theme) => theme.palette.divider,
          visibility: wheelVisibility,
        }}
      />
      <CircularProgress
        variant="determinate"
        size={wheelSize}
        thickness={wheelThickness}
        color={wheelColor}
        value={wheelValue}
        sx={{ visibility: wheelVisibility }}
      />
    </Stack>
  );
};
