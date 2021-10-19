import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useUpdateMe } from './hooks/useUpdateMe';

export const EditProfileForm = ({ me }) => {
  const {
    register,
    handleSubmit,
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
    formData.append('avatar', data.avatar[0]);
    formData.append('banner', data.banner[0]);

    update(formData, {
      onSuccess: () => {
        e.target.reset();
      },
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} m={2}>
      <label htmlFor="avatar">Avatar</label>
      <input
        {...register('avatar', {
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
        name="avatar"
      />
      <p style={{ color: 'red' }}>{errors?.avatar && errors?.avatar.message}</p>
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

      <label htmlFor="name">name</label>
      <input
        type="text"
        placeholder="name"
        {...register('name', { required: true, maxLength: 280 })}
      />
      <label htmlFor="bio">bio</label>
      <input
        type="text"
        placeholder="bio"
        {...register('bio', { maxLength: 160 })}
      />
      <p style={{ color: 'red' }}>
        {errors.bio?.type === 'maxLength' && 'max length 160 characters'}
      </p>
      <label htmlFor="location">location</label>
      <input
        type="text"
        placeholder="location"
        {...register('location', { maxLength: 30 })}
      />
      <p style={{ color: 'red' }}>
        {errors.location?.type === 'required' && 'location is required'}
      </p>

      <button type="submit">{isLoading ? 'Saving...' : 'Save'}</button>
    </Stack>
  );
};

EditProfileForm.propTypes = {
  me: PropTypes.object.isRequired,
};
