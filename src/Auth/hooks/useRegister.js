import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { register } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useRegister = () => {
  const { updateUser } = useMe();
  const navigate = useNavigate();

  const { mutate: registerUser, isLoading } = useMutation(register, {
    onSuccess: (data) => {
      updateUser(data);
      navigate('/');
    },
  });

  return { registerUser, isLoading };
};
