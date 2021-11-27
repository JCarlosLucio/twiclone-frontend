import { useContext } from 'react';
import { BsBrush } from 'react-icons/bs';
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { CustomModal } from '../shared';
import { useModal } from '../shared/hooks/useModal';
import { usePopover } from '../shared/hooks/usePopover';
import { ColorModeContext } from '../utils/ColorModeProvider';

export const MoreButton = () => {
  const { open, openModal, closeModal } = useModal(false);
  const { anchorEl, openPopover, closePopover, id } = usePopover(
    null,
    'more-popover'
  );
  const colorMode = useContext(ColorModeContext);

  const handleThemeChange = ({ target }) => {
    colorMode.setMode(target.value);
  };

  return (
    <>
      <Button
        onClick={openPopover}
        color="secondary"
        size="large"
        startIcon={<IoEllipsisHorizontalCircle />}
        sx={{ fontWeight: 400 }}
      >
        More
      </Button>
      <Menu
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': { borderRadius: '5px' },
          '& .MuiList-padding': { padding: 0 },
        }}
      >
        <MenuItem onClick={openModal}>
          <ListItemIcon>
            <BsBrush fontSize="large" />
          </ListItemIcon>
          <ListItemText>Display</ListItemText>
        </MenuItem>
      </Menu>
      <CustomModal open={open} handleClose={closeModal}>
        <Stack alignItems="center" spacing={3} p={2}>
          <Stack sx={{ width: '100%' }} alignItems="center" spacing={2}>
            <FormLabel component="legend" sx={{ fontSize: 20 }}>
              Choose your theme
            </FormLabel>
            <RadioGroup
              row
              aria-label="theme colors"
              name="theme-buttons-group"
              value={colorMode.mode}
              onChange={handleThemeChange}
              sx={{ width: '100%' }}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
                sx={{
                  flexGrow: 1,
                  margin: '0 0.5rem',
                  justifyContent: 'center',
                  height: '100px',
                  borderRadius: '1rem',
                  borderStyle: 'solid',
                  borderWidth: colorMode.mode === 'light' ? '2px' : '1px',
                  borderColor:
                    colorMode.mode === 'light' ? 'primary.main' : 'divider',
                  color: 'text.secondary',
                  backgroundColor: '#fff',
                  '& .MuiTypography-root': {
                    fontSize: colorMode.mode === 'light' ? 20 : 18,
                    fontWeight: 700,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 32,
                  },
                  transition: 'ease-in-out',
                }}
              />
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label="Dark"
                sx={{
                  flexGrow: 1,
                  margin: '0 0.5rem',
                  justifyContent: 'center',
                  height: '100px',
                  borderRadius: '1rem',
                  borderStyle: 'solid',
                  borderWidth: colorMode.mode === 'dark' ? '2px' : '1px',
                  borderColor:
                    colorMode.mode === 'dark' ? 'primary.main' : 'divider',
                  color: 'text.secondary',
                  backgroundColor: '#000',
                  '& .MuiTypography-root': {
                    fontSize: colorMode.mode === 'dark' ? 20 : 18,
                    fontWeight: 700,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 32,
                  },
                  transition: 'ease-in-out',
                }}
              />
            </RadioGroup>
          </Stack>

          <Button variant="contained" onClick={closeModal}>
            Done
          </Button>
        </Stack>
      </CustomModal>
    </>
  );
};
