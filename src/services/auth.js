import axios from 'axios';
import { API_URL } from '../constants';
import storage from '../utils/storage';

const baseUrl = `${API_URL}/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  storage.saveUser(response.data);

  return response.data;
};

export const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);

  storage.saveUser(response.data);

  return response.data;
};
