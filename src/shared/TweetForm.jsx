import { useEffect, useState } from 'react';
import { BsImage, BsXCircleFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCreateTweet } from './hooks/useCreateTweet';
import { useMe } from './hooks/useMe';
import { prepareForImageList } from '../utils/images';
import SnackbarUtils from '../utils/SnackbarUtils';

export const TweetForm = ({ tweet }) => {
  const { me } = useMe();
  const [imageList, setImageList] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const { create, isLoading } = useCreateTweet();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const objectUrls = imageList.map((image) => ({
      objUrl: URL.createObjectURL(image),
    }));
    setPreviews(prepareForImageList(objectUrls));
    // createdObjectURLs remain in memory if not revoked
    return () => objectUrls.map(({ objUrl }) => URL.revokeObjectURL(objUrl));
  }, [imageList]);

  const removeImage = (index) => {
    const withoutImage = imageList.filter((_, i) => i !== index);
    setImageList(withoutImage);
  };

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
    setPreviews([]);
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
              maxLength: 280,
            })}
          />

          {previews?.length > 0 && (
            <ImageList
              cols={2}
              variant="quilted"
              gap={12}
              rowHeight={134}
              sx={{ height: 280 }}
            >
              {previews.map(({ objUrl, cols, rows }, i) => {
                return (
                  <ImageListItem
                    key={objUrl}
                    cols={cols}
                    rows={rows}
                    sx={{ borderRadius: '16px', overflow: 'hidden' }}
                  >
                    <IconButton
                      sx={{ position: 'absolute' }}
                      onClick={() => removeImage(i)}
                    >
                      <BsXCircleFill />
                    </IconButton>
                    <img src={objUrl} alt="" loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}

          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <input
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

            <Stack sx={{ position: 'relative' }}>
              {280 - charCount < 21 && (
                <Typography
                  variant="caption"
                  align="center"
                  color={280 - charCount < 1 ? 'error' : 'text.secondary'}
                  sx={{ position: 'absolute', left: 10, top: 6 }}
                >
                  {280 - charCount}
                </Typography>
              )}

              <CircularProgress
                variant="determinate"
                size={280 - charCount > 20 ? 20 : 30}
                thickness={280 - charCount > 20 ? 4 : 3}
                value={100}
                sx={{
                  position: 'absolute',
                  left: 0,
                  color: (theme) =>
                    280 - charCount > -10
                      ? theme.palette.divider
                      : 'transparent',
                }}
              />
              <CircularProgress
                variant="determinate"
                size={280 - charCount > 20 ? 20 : 30}
                thickness={280 - charCount > 20 ? 4 : 3}
                value={280 - charCount < 1 ? 100 : charCount / 2.8}
                color={
                  (280 - charCount < 1 && 'error') ||
                  (280 - charCount <= 20 && 'warning') ||
                  (280 - charCount > 20 && 'primary')
                }
                sx={{
                  visibility: 280 - charCount > -10 ? 'visible' : 'hidden',
                }}
              />
            </Stack>
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
