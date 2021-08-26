import { USER_STORAGE_KEY } from '../constants';

const saveUser = (user) =>
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

const loadUser = () =>
  JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));

const clearUser = () => window.localStorage.removeItem(USER_STORAGE_KEY);

export default {
  saveUser,
  loadUser,
  clearUser,
};
