import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { dateFromNow, dateFull } from '../utils/date';

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
        alignItems={direction === 'row' ? 'center' : 'flex-start'}
        {...(withLink && {
          to: `/${user.username}`,
          onClick: (e) => e.stopPropagation(),
        })}
        component={withLink ? Link : 'div'}
        spacing={direction === 'row' ? 0.5 : 0}
        sx={{
          maxWidth: '600px',
          textDecoration: 'none',
          '&:hover span:first-of-type': {
            textDecoration: withLink ? 'underline 2px' : 'none',
          },
        }}
      >
        <Typography
          color="text.primary"
          noWrap
          sx={{
            fontWeight: 700,
            textOverflow: 'ellipsis',
            maxWidth: direction === 'row' ? '420px' : '120px',
          }}
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >{`@${user.username}`}</Typography>
      </Stack>
      {createdAt && (
        <>
          <Typography color="text.secondary">·</Typography>
          <Tooltip title={dateFull(createdAt)} enterDelay={500}>
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
          </Tooltip>
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
