import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRegister } from './hooks/useRegister';

export const Register = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, isLoading } = useRegister();

  const onSubmit = (formData) => {
    registerUser(formData);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      my={2}
    >
      <TextField
        type="text"
        variant="outlined"
        label="Name"
        placeholder="Name"
        error={!!errors.name}
        helperText={
          (errors.name?.type === 'required' && 'Name is required') ||
          (errors.name?.type === 'maxLength' &&
            'Name must be 128 characters or less')
        }
        {...register('name', {
          required: true,
          maxLength: 128,
        })}
      />

      <TextField
        type="text"
        variant="outlined"
        label="Username"
        placeholder="Username"
        error={!!errors.username}
        helperText={
          (errors.username?.type === 'required' && 'Username is required') ||
          (errors.username?.type === 'minLength' &&
            'Username should be more than 4 characters') ||
          (errors.username?.type === 'maxLength' &&
            'Username must be 15 characters or less') ||
          (errors.username?.type === 'pattern' &&
            'Username must contain only letters, numbers, underscores and no spaces')
        }
        {...register('username', {
          required: true,
          pattern: /^[a-zA-Z0-9_]+$/,
          minLength: 5,
          maxLength: 15,
        })}
      />

      <TextField
        type="text"
        variant="outlined"
        label="Email"
        placeholder="Email"
        error={!!errors.email}
        helperText={
          (errors.email?.type === 'required' && 'Email is required') ||
          (errors.email?.type === 'pattern' && 'Must be a valid email')
        }
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <TextField
        type="password"
        variant="outlined"
        label="Password"
        placeholder="Password"
        error={!!errors.password}
        helperText={
          (errors.password?.type === 'required' && 'Password is required') ||
          (errors.password?.type === 'maxLength' &&
            'Password must be 128 characters or less')
        }
        {...register('password', {
          required: true,
          maxLength: 128,
        })}
      />

      <TextField
        type="password"
        variant="outlined"
        label="Confirm password"
        placeholder="Confirm password"
        error={!!errors.passwordConfirm}
        helperText={
          (errors.passwordConfirm?.type === 'required' &&
            'Password Confirmation is required') ||
          (errors.passwordConfirm?.type === 'maxLength' &&
            'Password Confirmation must be 128 characters or less') ||
          errors.passwordConfirm?.message
        }
        {...register('passwordConfirm', {
          required: true,
          maxLength: 128,
          validate: {
            matchesPassword: (value) =>
              value === getValues().password || 'Passwords must match',
          },
        })}
      />

      <Button type="submit" size="large" variant="contained">
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Stack>
  );
};
