import { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCreateTweet } from './hooks/useCreateTweet';
import { useMe } from './hooks/useMe';
import SnackbarUtils from '../utils/SnackbarUtils';

export const TweetForm = ({ tweet }) => {
  const { me } = useMe();
  const [imageList, setImageList] = useState([]);
  const { create, isLoading } = useCreateTweet();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data, e) => {
    const formData = new FormData();
    if (tweet?.id) {
      formData.append('parent', tweet.id);
    }
    formData.append('content', data.content);

    imageList.forEach((image) => {
      formData.append('images', image);
    });

    await create(formData);
    setImageList([]);
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
            {...register('content', { maxLength: 280 })}
          />
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <label htmlFor="icon-button-file">
              <input
                {...register('images', {
                  onChange: ({ target }) => {
                    const files = [...target.files];
                    // resets value of files so it doesn't duplicate values in imageList
                    setValue('images', undefined);

                    const maxFiles =
                      files.length > 4 || files.length + imageList.length > 4;

                    const maxSize = files.some(
                      (file) => file?.size > 3 * 1024 * 1024
                    );

                    const acceptedFormats = files.some(
                      (file) =>
                        ![
                          'image/png',
                          'image/jpeg',
                          'image/jpg',
                          'image/gif',
                        ].includes(file?.type)
                    );

                    if (maxSize) {
                      SnackbarUtils.error('Please choose photos up to 3MB.');
                    }
                    if (acceptedFormats) {
                      SnackbarUtils.error(
                        'Please choose PNG, JPG, JPEG or GIF photos'
                      );
                    }
                    if (maxFiles) {
                      SnackbarUtils.error('Please choose up to 4 photos.');
                    }
                    if (maxSize || acceptedFormats || maxFiles) return;

                    setImageList([...imageList, ...files]);
                  },
                })}
                id="icon-button-file"
                type="file"
                name="images"
                multiple
                accept="image/jpeg,image/png,image/gif"
                style={{ display: 'none' }}
              />
              <IconButton
                color="primary"
                aria-label="Add photos"
                component="span"
              >
                <BsImage />
              </IconButton>
            </label>

            <Button type="submit" size="medium" variant="contained">
              {isLoading ? 'Tweeting...' : tweet ? 'Reply' : 'Tweet'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
