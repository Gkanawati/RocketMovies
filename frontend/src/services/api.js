import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rocketmovies-backend-mrt1.onrender.com'
});