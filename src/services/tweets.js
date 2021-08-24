import axios from 'axios';
import { API_URL } from '../constants';

const baseUrl = `${API_URL}/tweets`;

export const getAllTweets = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
