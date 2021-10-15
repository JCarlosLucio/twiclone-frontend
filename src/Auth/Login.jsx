import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useLogin } from './hooks/useLogin';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore
  const { loginUser, isLoading } = useLogin();

  const onSubmit = async (formData) => {
    await loginUser({ ...formData });
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
        size="large"
        label="Email"
        placeholder="Email"
        error={!!errors.email}
        helperText={
          errors.email?.type === 'required'
            ? 'Email is required'
            : errors.email?.type === 'pattern' && 'Must be a valid email'
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
          errors.password?.type === 'required' && 'Password is required'
        }
        {...register('password', { required: true, maxLength: 128 })}
      />

      <Button type="submit" size="large" variant="contained">
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Stack>
  );
};
