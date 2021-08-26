import axios from 'axios';
import { API_URL } from '../constants';
import { authHeader } from './auth-header';
import storage from '../utils/storage';

const baseUrl = `${API_URL}/users`;

export const getCurrentUser = async () => {
  const username = storage.loadUser()?.username;
  if (username) {
    const response = await axios.get(`${baseUrl}/${username}`, authHeader());
    return response.data;
  }
  return null;
};
