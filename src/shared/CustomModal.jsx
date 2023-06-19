import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';

export const CustomModal = ({ children, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: (theme) => theme.palette.backdrop,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          height: '53px',
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: '0 5px',
        }}
      >
        <IconButton onClick={handleClose}>
          <BsX />
        </IconButton>
      </Stack>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
