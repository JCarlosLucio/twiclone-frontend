import { BsArrowLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export const BackButton = () => {
  const { goBack } = useHistory();

  const handleBack = (e) => {
    e.stopPropagation();
    goBack();
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
