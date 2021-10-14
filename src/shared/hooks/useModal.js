import PropTypes from 'prop-types';
import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose };
};

useModal.propTypes = {
  initialValue: PropTypes.bool,
};
