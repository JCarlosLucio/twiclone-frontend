import axios from 'axios';

import { API_URL } from '../constants';
import { authHeader } from './auth-header';

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
      authHeader(),
    );
    return response.data;
  }
  return null;
};

export const getWhoToFollow = async (userId) => {
  if (userId) {
    const response = await axios.get(`${baseUrl}/${userId}/whotofollow`);
    return response.data;
  }
  return null;
};
