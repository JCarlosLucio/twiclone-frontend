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
    h: '1 h',
    hh: '%dh',
    d: '1 d',
    dd: '%dd',
    M: '1 m',
    MM: '%dm',
    y: '1 y',
    yy: '%dy',
  },
});

export const dateFromNow = (date) => dayjs(new Date(date)).fromNow();
