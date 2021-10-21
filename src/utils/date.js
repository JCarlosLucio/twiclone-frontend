import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

export const dateFromNow = (date) => dayjs(new Date(date)).fromNow();

export const dateMonthYear = (date) =>
  dayjs(new Date(date)).format('MMMM YYYY');

export const dateFull = (date) =>
  dayjs(new Date(date)).format('h:mm A · MMM D, YYYY');
