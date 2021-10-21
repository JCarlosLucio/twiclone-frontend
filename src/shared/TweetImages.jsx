import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { prepareForImageList } from '../utils/images';

export const TweetImages = ({ images }) => {
  const preparedImages = prepareForImageList(images);

  if (preparedImages?.length < 1) {
    return null;
  }

  return (
    <ImageList
      cols={2}
      variant="quilted"
      gap={2}
      rowHeight={139}
      sx={{ borderRadius: '16px', height: 280 }}
    >
      {preparedImages.map(({ url, filename, cols, rows }) => {
        return (
          <ImageListItem key={filename} cols={cols} rows={rows}>
            <img src={url} alt="Image" loading="lazy" />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

TweetImages.propTypes = {
  images: PropTypes.array,
};
