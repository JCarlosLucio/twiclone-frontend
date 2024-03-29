import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import SnackbarUtils from '../utils/SnackbarUtils';
import { CharCounter } from './CharCounter';
import { useCreateTweet } from './hooks/useCreateTweet';
import { useMe } from './hooks/useMe';
import { ImagePreviews } from './ImagePreviews';
import { UserHeader } from './UserHeader';

export const TweetForm = ({
  tweet,
  fileInputId,
  handleClose,
  showParent = false,
}) => {
  const { me } = useMe();
  const [imageList, setImageList] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const { create, isLoading } = useCreateTweet();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const removeImage = (index) => {
    const withoutImage = imageList.filter((_, i) => i !== index);
    setImageList(withoutImage);
  };

  const resetForm = () => {
    setValue('content', '');
    setCharCount(0);
    setImageList([]);
    handleClose && handleClose();
  };

  const action = (data) => (
    <Button
      variant="text"
      sx={{ color: 'white' }}
      onClick={() => navigate(`/${data.user.username}/status/${data.id}`)}
    >
      View
    </Button>
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    if (tweet?.id) {
      formData.append('parent', tweet.id);
    }
    formData.append('content', data.content);

    imageList.forEach((image) => {
      formData.append('images', image);
    });

    create(formData, {
      onSuccess: (data) => {
        resetForm();
        SnackbarUtils.info('Your Tweet was sent.', {
          action: () => action(data),
        });
      },
    });
  };

  return (
    <Stack>
      {tweet && showParent && (
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Stack alignItems="center">
            <Avatar src={tweet.user.avatar.url} alt={`${tweet.user.name}`} />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ height: 'calc(100% - 36px)', borderRightWidth: '2px' }}
            />
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <UserHeader user={tweet.user} createdAt={tweet.createdAt} />
            <Typography>{tweet.content}</Typography>
          </Stack>
        </Stack>
      )}

      <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ p: 2 }}>
        <Stack>
          <Avatar src={me.avatar.url} alt={`${me.name}`} />
        </Stack>
        <Stack sx={{ width: '100%' }}>
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

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
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
                        (file) => file?.size > 3 * 1024 * 1024,
                      );

                      const acceptedFormats = files.some(
                        (file) =>
                          ![
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'image/gif',
                          ].includes(file?.type),
                      );

                      if (maxSize) {
                        SnackbarUtils.error('Please choose photos up to 3MB.');
                      }
                      if (acceptedFormats) {
                        SnackbarUtils.error(
                          'Please choose PNG, JPG, JPEG or GIF photos',
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
                <Tooltip title="Media" enterDelay={500}>
                  <IconButton
                    color="primary"
                    aria-label="Add photos"
                    component="span"
                    disabled={imageList?.length >= 4}
                    size="small"
                  >
                    <BsImage fontSize="large" />
                  </IconButton>
                </Tooltip>
              </label>

              <Stack direction="row" alignItems="center" spacing={2}>
                {charCount > 0 && <CharCounter count={charCount} />}

                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  disabled={
                    !(
                      (charCount > 0 && charCount <= 280) ||
                      imageList.length > 0
                    )
                  }
                >
                  {isLoading ? 'Tweeting...' : tweet ? 'Reply' : 'Tweet'}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

TweetForm.propTypes = {
  tweet: PropTypes.object,
  fileInputId: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
  showParent: PropTypes.bool,
};
