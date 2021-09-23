import axios from 'axios';
import { API_URL } from '../constants';
import { authHeader } from './auth-header';

const baseUrl = `${API_URL}/tweets`;

export const getTweets = async (page, limit = 10) => {
  const response = await axios.get(`${baseUrl}/?page=${page}&limit=${limit}`);
  return response.data;
};

export const createTweet = async (newTweet) => {
  const response = await axios.post(baseUrl, newTweet, authHeader());
  return response.data;
};

export const likeTweet = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/like`, null, authHeader());
  return response.data;
};
