import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router';

import { register } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useRegister = () => {
  const { updateUser } = useMe();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const { mutate: registerUser, isLoading } = useMutation(register, {
    onSuccess: (data) => {
      updateUser(data);
      navigate(from, { replace: true });
    },
  });

  return { registerUser, isLoading };
};
