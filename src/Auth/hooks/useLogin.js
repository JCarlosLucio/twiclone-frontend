import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router';

import { login } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useLogin = () => {
  const { updateUser } = useMe();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const { mutate: loginUser, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      updateUser(data);
      navigate(from, { replace: true });
    },
  });

  return { loginUser, isLoading };
};
