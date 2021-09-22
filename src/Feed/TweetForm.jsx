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
      <p style={{ color: 'red' }}>
        {errors.content?.type === 'required' && 'Content is required'}
      </p>

      <input
        {...register('images', {
          validate: {
            maxFiles: (files) => files.length <= 4 || 'Max 4 images',
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
        name="images"
        multiple
      />
      <p style={{ color: 'red' }}>{errors?.images && errors?.images.message}</p>

      <button type="submit">{isLoading ? 'Tweeting...' : 'Tweet'}</button>
    </form>
  );
};
