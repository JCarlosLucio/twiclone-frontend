import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { dateFromNow } from '../utils/date';

export const UserHeader = ({ user, createdAt, withLink = false }) => {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={0.5}
      sx={{
        '& a': {
          textDecoration: 'none',
          fontWeight: 700,
        },
        '&:hover': {
          '& a': {
            textDecoration: 'underline',
          },
        },
      }}
    >
      {withLink ? (
        <Typography
          color="text.primary"
          to={`/${user.username}`}
          component={Link}
        >
          {user.name}
        </Typography>
      ) : (
        <Typography color="text.primary" sx={{ fontWeight: 700 }}>
          {user.name}
        </Typography>
      )}
      <Typography color="text.secondary">{`@${user.username}`}</Typography>
      <Typography color="text.secondary">·</Typography>
      <Typography color="text.secondary">{dateFromNow(createdAt)}</Typography>
    </Stack>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  withLink: PropTypes.bool,
};
