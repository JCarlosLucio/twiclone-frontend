import { useState } from 'react';
import { MdOutlineCameraEnhance } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useUpdateMe } from './hooks/useUpdateMe';
import SnackbarUtils from '../utils/SnackbarUtils';

export const EditProfileForm = ({ me, handleClose }) => {
  const [avatar, setAvatar] = useState();
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
    formData.append('banner', data.banner[0]);

    update(formData, {
      onSuccess: () => {
        e.target.reset();
        handleClose && handleClose();
      },
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} m={2}>
      <label htmlFor="avatar-file-input">
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
        <IconButton color="secondary" aria-label="Add avatar" component="span">
          <MdOutlineCameraEnhance />
        </IconButton>
      </label>

      <label htmlFor="banner">banner</label>
      <input
        {...register('banner', {
          validate: {
            maxFiles: (files) => files.length <= 1 || 'Max 1 image',
            maxSize: (files) =>
              [...files].every((file) => file?.size < 3 * 1024 * 1024) ||
              'Max 3MB',
            acceptedFormats: (files) =>
              [...files].every((file) =>
                ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
                  file?.type
                )
              ) || 'Only PNG, JPG, JPEG e GIF',
          },
        })}
        type="file"
        name="banner"
      />
      <p style={{ color: 'red' }}>{errors?.banner && errors?.banner.message}</p>

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
      <Button type="submit" size="large" variant="contained">
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </Stack>
  );
};

EditProfileForm.propTypes = {
  me: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};
