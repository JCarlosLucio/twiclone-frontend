import { useState } from 'react';

export const usePopover = (initialValue = null, id) => {
  const [anchorEl, setAnchorEl] = useState(initialValue);

  const openPopover = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setAnchorEl(e.currentTarget);
  };
  const closePopover = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setAnchorEl(null);
  };

  const popoverId = anchorEl ? id : undefined;

  return { anchorEl, openPopover, closePopover, id: popoverId };
};
