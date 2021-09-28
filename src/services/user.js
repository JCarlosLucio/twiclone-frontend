import axios from 'axios';
import { authHeader } from './auth-header';
import { API_URL } from '../constants';

const baseUrl = `${API_URL}/users`;

export const getUser = async (username) => {
  if (username) {
    const response = await axios.get(`${baseUrl}/${username}`);
    return response.data;
  }
  return null;
};

export const followUser = async (userId) => {
  if (userId) {
    const response = await axios.post(
      `${baseUrl}/${userId}/follow`,
      null,
      authHeader()
    );
    return response.data;
  }
  return null;
};
