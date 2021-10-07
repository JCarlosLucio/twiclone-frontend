import { useForm } from 'react-hook-form';
import { useCreateTweet } from './hooks/useCreateTweet';
import { useMe } from './hooks/useMe';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export const TweetForm = ({ tweet }) => {
  const { me } = useMe();
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
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}
    >
      <Stack>
        <Avatar src={me.avatar.url} alt={`${me.name}`} />
      </Stack>
      <Stack sx={{ width: '100%' }}>
        {tweet && (
          <div>
            <h3>{tweet.user.name}</h3>
            <p>{tweet.content}</p>
          </div>
        )}
        <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            multiline
            rows={4}
            placeholder="What's happening?"
            variant="standard"
            {...register('content', { required: true, maxLength: 280 })}
          />
          <p style={{ color: 'red' }}>
            {errors?.images && errors?.images.message}
            {errors.content?.type === 'required' && 'Content is required'}
          </p>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
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

            <Button type="submit" size="medium" variant="contained">
              {isLoading ? 'Tweeting...' : tweet ? 'Reply' : 'Tweet'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
