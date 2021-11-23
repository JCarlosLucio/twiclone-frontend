import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <Stack mr={3}>
      <IconButton
        size="small"
        color="secondary"
        edge="start"
        onClick={handleBack}
      >
        <BsArrowLeft fontSize="large" />
      </IconButton>
    </Stack>
  );
};
