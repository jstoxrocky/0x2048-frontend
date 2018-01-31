import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';
const withCredentials = true;
const api = axios.create({ withCredentials, baseURL });

export const unhandledMove = (user, direction) => (
  api.post('/move', { user, direction })
);

export const unhandledPrice = user => (
  api.get('/price', { params: { user } })
);
