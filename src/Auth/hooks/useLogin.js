import { useMutation } from 'react-query';
import { login } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useLogin = () => {
  const { updateUser } = useMe();

  const { mutate: loginUser, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      updateUser(data);
    },
  });

  return { loginUser, isLoading };
};
