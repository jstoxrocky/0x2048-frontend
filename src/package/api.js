import axios from 'axios';
import { handleServerErrors } from './decorators';

const baseURL = 'https://www.0x2048-int.net/api/v1'; // 'http://127.0.0.1:5000/api/v1'; // 'https://www.0x2048-int.net/api/v1';
const withCredentials = true;
const api = axios.create({ withCredentials, baseURL });

api.interceptors.response.use(response => response.data);

export const baseGameState = () => (
  api.get('/gamestate')
);

export const baseMove = move => (
  api.post('/move', move)
);

export const baseNonce = () => (
  api.get('/nonce')
);

export const basePaymentConfirmation = receipt => (
  api.get('/payment-confirmation', {
    params: receipt,
  })
);

export const move = (...args) => {
  const safeMove = handleServerErrors(baseMove);
  return safeMove(...args);
};

export const gameState = (...args) => {
  const safeGameState = handleServerErrors(baseGameState);
  return safeGameState(...args);
};

export const nonce = (...args) => {
  const safenonce = handleServerErrors(baseNonce);
  return safenonce(...args);
};

export const paymentConfirmation = (...args) => {
  const safenonce = handleServerErrors(basePaymentConfirmation);
  return safenonce(...args);
};
