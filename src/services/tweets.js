import axios from 'axios';
import { API_URL } from '../constants';
import { authHeader } from './auth-header';

const baseUrl = `${API_URL}/tweets`;

export const getTweets = async (page) => {
  const response = await axios.get(`${baseUrl}/?page=${page}`);
  return response.data;
};

export const createTweet = async (newTweet) => {
  const response = await axios.post(baseUrl, newTweet, authHeader());
  return response.data;
};
