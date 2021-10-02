import { useContext } from 'react';
import Button from '@mui/material/Button';
import { useMe } from '../shared/hooks/useMe';
import { ColorModeContext } from '../utils/ColorModeProvider';

export const Menu = () => {
  const { me, clearUser } = useMe();
  const colorMode = useContext(ColorModeContext);

  const logout = () => {
    clearUser();
  };

  return (
    <>
      <h1>Twiclone</h1>
      {me && (
        <div>
          {me.name}
          <Button variant="contained" onClick={logout}>
            logout
          </Button>
        </div>
      )}
      <Button onClick={colorMode.toggleColorMode}>
        toggle {colorMode.mode}
      </Button>
    </>
  );
};
