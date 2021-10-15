import { useMutation } from 'react-query';
import { register } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useRegister = () => {
  const { updateUser } = useMe();

  const { mutateAsync: registerUser, isLoading } = useMutation(register, {
    onSuccess: (data) => {
      updateUser(data);
    },
  });

  return { registerUser, isLoading };
};
