import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { dateFromNow } from '../utils/date';

export const UserHeader = ({
  user,
  createdAt,
  direction = 'row',
  withLink = false,
}) => {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={0.5}>
      <Stack
        direction={direction}
        alignItems="flex-start"
        {...(withLink && {
          to: `/${user.username}`,
          onClick: (e) => e.stopPropagation(),
        })}
        component={withLink ? Link : 'div'}
        sx={{
          textDecoration: 'none',
          '&:hover span:first-of-type': {
            textDecoration: withLink ? 'underline 2px' : 'none',
          },
        }}
      >
        <Typography color="text.primary" sx={{ fontWeight: 700 }}>
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            textDecoration: 'none',
          }}
        >{`@${user.username}`}</Typography>
      </Stack>
      {createdAt && (
        <>
          <Typography color="text.secondary">·</Typography>
          <Typography
            color="text.secondary"
            sx={{
              '&:hover': {
                textDecoration: withLink ? 'underline' : 'none',
              },
            }}
          >
            {dateFromNow(createdAt)}
          </Typography>
        </>
      )}
    </Stack>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string,
  withLink: PropTypes.bool,
};
