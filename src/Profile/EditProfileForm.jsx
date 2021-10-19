import { useState } from 'react';
import { MdOutlineCameraEnhance } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { AvatarPreview } from './AvatarPreview';
import { useUpdateMe } from './hooks/useUpdateMe';
import SnackbarUtils from '../utils/SnackbarUtils';
import { BannerPreview } from './BannerPreview';

export const EditProfileForm = ({ me, handleClose }) => {
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: me.name, bio: me.bio, location: me.location },
  });
  const { update, isLoading } = useUpdateMe();

  const onSubmit = (data, e) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('bio', data.bio);
    formData.append('location', data.location);
    formData.append('avatar', avatar);
    formData.append('banner', banner);

    update(formData, {
      onSuccess: () => {
        e.target.reset();
        handleClose && handleClose();
      },
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative' }}
      >
        <BannerPreview defaultBanner={me?.banner?.url} banner={banner} />

        <label htmlFor="banner-file-input" style={{ position: 'absolute' }}>
          <input
            id="banner-file-input"
            type="file"
            name="banner"
            accept="image/jpeg,image/png,image/gif"
            style={{ display: 'none' }}
            {...register('banner', {
              onChange: ({ target }) => {
                const [file] = [...target.files];
                // resets value of banner
                setValue('banner', undefined);

                const maxSize = file.size > 3 * 1024 * 1024;

                const acceptedFormats = ![
                  'image/png',
                  'image/jpeg',
                  'image/jpg',
                  'image/gif',
                ].includes(file?.type);

                if (maxSize) {
                  SnackbarUtils.error('Please choose photos up to 3MB.');
                }
                if (acceptedFormats) {
                  SnackbarUtils.error(
                    'Please choose PNG, JPG, JPEG or GIF photos.'
                  );
                }
                if (maxSize || acceptedFormats) return;

                setBanner(file);
              },
            })}
          />
          <IconButton
            color="secondary"
            aria-label="Add banner"
            component="span"
          >
            <MdOutlineCameraEnhance />
          </IconButton>
        </label>
      </Stack>

      <Stack p={2}>
        <Stack alignItems="flex-start" sx={{ mt: '-80px' }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ position: 'relative' }}
          >
            <AvatarPreview defaultAvatar={me?.avatar?.url} avatar={avatar} />

            <label htmlFor="avatar-file-input" style={{ position: 'absolute' }}>
              <input
                id="avatar-file-input"
                type="file"
                name="avatar"
                accept="image/jpeg,image/png,image/gif"
                style={{ display: 'none' }}
                {...register('avatar', {
                  onChange: ({ target }) => {
                    const [file] = [...target.files];
                    // resets value of avatar
                    setValue('avatar', undefined);

                    const maxSize = file.size > 3 * 1024 * 1024;

                    const acceptedFormats = ![
                      'image/png',
                      'image/jpeg',
                      'image/jpg',
                      'image/gif',
                    ].includes(file?.type);

                    if (maxSize) {
                      SnackbarUtils.error('Please choose photos up to 3MB.');
                    }
                    if (acceptedFormats) {
                      SnackbarUtils.error(
                        'Please choose PNG, JPG, JPEG or GIF photos.'
                      );
                    }
                    if (maxSize || acceptedFormats) return;

                    setAvatar(file);
                  },
                })}
              />

              <IconButton
                color="secondary"
                aria-label="Add avatar"
                component="span"
              >
                <MdOutlineCameraEnhance />
              </IconButton>
            </label>
          </Stack>
        </Stack>

        <Stack spacing={3} mt={2}>
          <TextField
            type="text"
            variant="outlined"
            size="large"
            label="Name"
            placeholder="Name"
            error={!!errors.name}
            helperText={
              (errors.name?.type === 'required' && 'Name is required') ||
              (errors.name?.type === 'maxLength' &&
                'Name must be 280 characters or less')
            }
            {...register('name', { required: true, maxLength: 280 })}
          />

          <TextField
            type="text"
            variant="outlined"
            size="large"
            multiline
            maxRows={3}
            rows={3}
            label="Bio"
            placeholder="Bio"
            error={!!errors.bio}
            helperText={
              errors.bio?.type === 'maxLength' &&
              'Bio must be 160 characters or less'
            }
            {...register('bio', { maxLength: 160 })}
          />

          <TextField
            type="text"
            variant="outlined"
            size="large"
            label="Location"
            placeholder="Location"
            error={!!errors.location}
            helperText={
              errors.location?.type === 'maxLength' &&
              'Location must be 30 characters or less'
            }
            {...register('location', { maxLength: 30 })}
          />

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="secondary"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

EditProfileForm.propTypes = {
  me: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};
