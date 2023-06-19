import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';

import { prepareForImageList } from '../utils/images';

export const ImagePreviews = ({ imageList, removeImage }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const objectUrls = imageList.map((image) => ({
      objUrl: URL.createObjectURL(image),
    }));
    setPreviews(prepareForImageList(objectUrls));
    // createdObjectURLs remain in memory if not revoked
    return () => objectUrls.map(({ objUrl }) => URL.revokeObjectURL(objUrl));
  }, [imageList]);

  if (previews?.length < 1) {
    return null;
  }

  return (
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
  );
};

ImagePreviews.propTypes = {
  imageList: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired,
};
