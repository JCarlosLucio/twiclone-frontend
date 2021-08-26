import axios from 'axios';
import { API_URL } from '../constants';
import { setToken } from './auth-header';
import storage from '../utils/storage';

const baseUrl = `${API_URL}/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  storage.saveUser(response.data);
  setToken(response.data.token);

  return response.data;
};
