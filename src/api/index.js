import axios from 'axios';

export const restApi = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
});
