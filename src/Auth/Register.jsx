import { useForm } from 'react-hook-form';
import { useRegister } from './hooks/useRegister';

export const Register = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, isLoading } = useRegister();

  const onSubmit = async (formData) => {
    await registerUser({ ...formData });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="name"
          {...register('name', {
            required: true,
            maxLength: 128,
          })}
        />
        <p style={{ color: 'red' }}>
          {errors.name?.type === 'required' && 'name is required'}
          {errors.name?.type === 'maxLength' &&
            'name must be 128 characters or less'}
        </p>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9_]+$/,
            minLength: 5,
            maxLength: 15,
          })}
        />
        <p style={{ color: 'red' }}>
          {errors.username?.type === 'required' && 'username is required'}
          {errors.username?.type === 'minLength' &&
            'username should be more than 4 characters'}
          {errors.username?.type === 'maxLength' &&
            'username must be 15 characters or less'}
          {errors.username?.type === 'pattern' &&
            'username must contain only letters, numbers, underscores and no spaces'}
        </p>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        <p>
          {errors.email?.type === 'required' && 'Email is required'}
          {errors.email?.type === 'pattern' && 'Email must be a valid email'}
        </p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: true, maxLength: 128 })}
        />
        <p>{errors.password?.type === 'required' && 'Password is required'}</p>

        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          placeholder="confirm password"
          {...register('passwordConfirm', {
            required: true,
            maxLength: 128,
            validate: {
              matchesPassword: (value) =>
                value === getValues().password || 'Passwords must match',
            },
          })}
        />
        <p>
          {errors.passwordConfirm?.type === 'required' &&
            'Password Confirmation is required'}
          {errors.passwordConfirm && errors.passwordConfirm.message}
        </p>

        <button type="submit">
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
