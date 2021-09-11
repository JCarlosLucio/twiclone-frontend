import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { register as registerUser } from '../services/auth';

export const Register = () => {
  const queryClient = useQueryClient();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('currentUser');
      console.log(data);
      // TODO: Navigate to Homepage
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    await mutateAsync({ ...formData });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
