import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createTweet } from '../services/tweets';
import { queryKeys } from '../constants';

export const TweetForm = ({ tweet }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm(); // prettier-ignore
  const { mutateAsync, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      const tweets = queryClient.getQueryData(queryKeys.tweets);
      const updatedTweets = {
        ...tweets,
        pages: tweets.pages.map((page) => {
          return {
            ...page,
            tweets: [data, ...page.tweets],
          };
        }),
      };

      queryClient.setQueryData(queryKeys.tweets, updatedTweets);
    },
  });

  const onSubmit = async (data, e) => {
    const formData = new FormData();
    if (tweet?.id) {
      formData.append('parent', tweet.id);
    }
    formData.append('content', data.content);

    [...data.images].forEach((image) => {
      formData.append('images', image);
    });

    await mutateAsync(formData);
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
