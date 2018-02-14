import axios from 'axios';

const baseURL = 'https://www.0x2048-int.net';
const withCredentials = true;
const api = axios.create({ withCredentials, baseURL });

api.interceptors.response.use(response => response.data);

export const gameState = () => (
  api.get('/gamestate')
);

export const move = (user, direction) => (
  api.post('/move', { user, direction })
);

export const price = user => (
  api.get('/price', { params: { user } })
);
