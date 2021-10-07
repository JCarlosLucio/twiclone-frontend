import { useForm } from 'react-hook-form';
import { useCreateTweet } from './hooks/useCreateTweet';

export const TweetForm = ({ tweet }) => {
  const { create, isLoading } = useCreateTweet();
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore

  const onSubmit = async (data, e) => {
    const formData = new FormData();
    if (tweet?.id) {
      formData.append('parent', tweet.id);
    }
    formData.append('content', data.content);

    [...data.images].forEach((image) => {
      formData.append('images', image);
    });

    await create(formData);
    e.target.reset();
  };

  return (
    <div>
      {tweet && (
        <div>
          <h3>{tweet.user.name}</h3>
          <p>{tweet.content}</p>
        </div>
      )}
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
                  [
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/gif',
                  ].includes(file?.type)
                ) || 'Only PNG, JPG, JPEG e GIF',
            },
          })}
          type="file"
          name="images"
          multiple
        />
        <p style={{ color: 'red' }}>
          {errors?.images && errors?.images.message}
        </p>

        <button type="submit">
          {isLoading ? 'Tweeting...' : tweet ? 'Reply' : 'Tweet'}
        </button>
      </form>
    </div>
  );
};
