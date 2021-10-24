import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);

  const openModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const closeModal = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return { open, openModal, closeModal };
};
