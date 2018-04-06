import axios from 'axios';
import { handleServerErrors } from './decorators';
import * as interfaces from './interfaces';

const baseURL = 'https://www.0x2048-int.net/api/v1';
const withCredentials = true;
const api = axios.create({ withCredentials, baseURL });

api.interceptors.response.use(response => response.data);

export const baseGameState = () => (
  api.get('/gamestate')
);

export const baseMove = (data: interfaces.Move) => (
  api.post('/move', data)
);

export const baseNonce = () => (
  api.get('/nonce')
);

export const basePaymentConfirmation = (data: interfaces.Receipt) => (
  api.get('/payment-confirmation', {
    params: data,
  })
);

export const move = (data: interfaces.Move): Promise<interfaces.SignedGameState> => {
  const safeMove = handleServerErrors(baseMove);
  const newGameState = safeMove(data);
  return newGameState;
};

export const gameState = () => {
  const safeGameState = handleServerErrors(baseGameState);
  const newGameState = safeGameState();
  return newGameState;
};

export const nonce = (): Promise<interfaces.Challenge> => {
  const safeNonce = handleServerErrors(baseNonce);
  const challenge = safeNonce();
  return challenge;
};

export const paymentConfirmation = (data: interfaces.Receipt): Promise<interfaces.SignedGameState> => {
  const safePaymentConfirmation = handleServerErrors(basePaymentConfirmation);
  const newGameState = safePaymentConfirmation(data);
  return newGameState;
};
