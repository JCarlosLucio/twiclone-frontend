import axios from 'axios';

import { API_URL } from '../constants';
import storage from '../utils/storage';
import { authHeader } from './authHeader';

const baseUrl = `${API_URL}/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export const getMe = async () => {
  const user = storage.loadUser();
  if (user) {
    const response = await axios.get(`${baseUrl}/me`, authHeader());
    return response.data;
  }

  return null;
};

export const updateMe = async (updatedMe) => {
  const user = storage.loadUser();
  if (user) {
    const response = await axios.put(`${baseUrl}/me`, updatedMe, authHeader());
    return response.data;
  }

  return null;
};
