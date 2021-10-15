import storage from '../utils/storage';

export const authHeader = () => {
  return { headers: { Authorization: `Bearer ${storage.loadUser()?.token}` } };
};
