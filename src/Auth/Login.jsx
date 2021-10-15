import { useForm } from 'react-hook-form';
import { useLogin } from './hooks/useLogin';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore
  const { loginUser, isLoading } = useLogin();

  const onSubmit = async (formData) => {
    await loginUser({ ...formData });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.type === 'required' && 'Email is required'}
        {errors.email?.type === 'pattern' && 'Email must be a valid email'}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: true, maxLength: 128 })}
        />
        {errors.password?.type === 'required' && 'Password is required'}

        <button type="submit">{isLoading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
};
