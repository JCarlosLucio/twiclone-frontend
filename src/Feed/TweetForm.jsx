import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createTweet } from '../services/tweets';

export const TweetForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore
  const { mutateAsync, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('tweets');
      console.log(data);
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    await mutateAsync({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="content">Content</label>
      <input
        type="text"
        placeholder="content"
        {...register('content', { required: true, maxLength: 280 })}
      />
      {errors.email?.type === 'required' && 'Content is required'}

      <button type="submit">{isLoading ? 'Tweeting...' : 'Tweet'}</button>
    </form>
  );
};
