import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { updateMe } from '../../services/auth';
import { useMe } from '../../shared/hooks/useMe';

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { me } = useMe();

  const { mutate: update, isLoading } = useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      queryClient.setQueryData([queryKeys.me], data);
      queryClient.setQueryData([queryKeys.user, me.username], data);
    },
  });

  return { update, isLoading };
};
