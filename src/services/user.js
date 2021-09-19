import axios from 'axios';
import { API_URL } from '../constants';

const baseUrl = `${API_URL}/users`;

export const getUser = async (username) => {
  if (username) {
    const response = await axios.get(`${baseUrl}/${username}`);
    return response.data;
  }
  return null;
};
