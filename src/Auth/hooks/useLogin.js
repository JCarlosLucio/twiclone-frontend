import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { login } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useLogin = () => {
  const { updateUser } = useMe();
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      updateUser(data);
      navigate('/');
    },
  });

  return { loginUser, isLoading };
};
