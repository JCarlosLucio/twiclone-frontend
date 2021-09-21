import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createTweet } from '../services/tweets';

export const TweetForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore
  const { mutateAsync, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('tweets');
      console.log('returnedData', data);
    },
  });

  const onSubmit = async (data, e) => {
    const formData = new FormData();
    formData.append('content', data.content);

    [...data.images].forEach((image) => {
      formData.append('images', image);
    });

    await mutateAsync(formData);
    e.target.reset();
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

      <input {...register('images')} type="file" name="images" multiple />

      <button type="submit">{isLoading ? 'Tweeting...' : 'Tweet'}</button>
    </form>
  );
};
