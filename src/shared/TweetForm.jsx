import { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { CharCounter } from './CharCounter';
import { ImagePreviews } from './ImagePreviews';
import { useCreateTweet } from './hooks/useCreateTweet';
import { useMe } from './hooks/useMe';
import SnackbarUtils from '../utils/SnackbarUtils';

export const TweetForm = ({ tweet, fileInputId }) => {
  const { me } = useMe();
  const [imageList, setImageList] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const { create, isLoading } = useCreateTweet();
  const { register, handleSubmit, setValue } = useForm();

  const removeImage = (index) => {
    const withoutImage = imageList.filter((_, i) => i !== index);
    setImageList(withoutImage);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (tweet?.id) {
      formData.append('parent', tweet.id);
    }
    formData.append('content', data.content);

    imageList.forEach((image) => {
      formData.append('images', image);
    });

    await create(formData);
    setValue('content', '');
    setCharCount(0);
    setImageList([]);
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

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Input
            multiline
            placeholder="What's happening?"
            variant="standard"
            disableUnderline
            sx={{ fontSize: '20px', paddingTop: '10px' }}
            {...register('content', {
              onChange: ({ target }) => {
                setCharCount(target.value.length);
              },
            })}
          />

          {imageList?.length > 0 && (
            <ImagePreviews imageList={imageList} removeImage={removeImage} />
          )}

          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={fileInputId}>
              <input
                id={fileInputId}
                type="file"
                name="images"
                multiple
                accept="image/jpeg,image/png,image/gif"
                style={{ display: 'none' }}
                disabled={imageList?.length >= 4}
                {...register('images', {
                  onChange: ({ target }) => {
                    const files = [...target.files];
                    // resets value of images so it doesn't duplicate values in imageList
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
              />
              <IconButton
                color="primary"
                aria-label="Add photos"
                component="span"
                disabled={imageList?.length >= 4}
              >
                <BsImage />
              </IconButton>
            </label>

            {charCount > 0 && <CharCounter count={charCount} />}

            <Button
              type="submit"
              size="medium"
              variant="contained"
              disabled={
                !((charCount > 0 && charCount <= 280) || imageList.length > 0)
              }
            >
              {isLoading ? 'Tweeting...' : tweet ? 'Reply' : 'Tweet'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
