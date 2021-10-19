import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export const BannerPreview = ({ defaultBanner, banner }) => {
  const [bannerPreview, setBannerPreview] = useState(defaultBanner);

  useEffect(() => {
    if (banner) {
      const objectUrl = URL.createObjectURL(banner);
      setBannerPreview(objectUrl);
      // createdObjectURL remains in memory if not revoked
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [banner]);

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack
        sx={{
          height: '100%',
          backgroundImage: () =>
            bannerPreview ? `url(${bannerPreview})` : 'none',
          backgroundColor: 'backdrop',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Stack sx={{ pb: '190px' }}></Stack>
      </Stack>
    </Stack>
  );
};

BannerPreview.propTypes = {
  defaultBanner: PropTypes.string,
  banner: PropTypes.object.isRequired,
};
