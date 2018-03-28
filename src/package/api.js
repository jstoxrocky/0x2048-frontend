import { handleServerErrors } from './decorators';
import * as baseAPI from '../../src/package/base-api';

export const move = (...args) => {
  const safeMove = handleServerErrors(baseAPI.move);
  return safeMove(...args);
};

export const gameState = (...args) => {
  const safeGameState = handleServerErrors(baseAPI.gameState);
  return safeGameState(...args);
};

export const nonce = (...args) => {
  const safenonce = handleServerErrors(baseAPI.nonce);
  return safenonce(...args);
};

export const addressConfirmation = (...args) => {
  const safenonce = handleServerErrors(baseAPI.addressConfirmation);
  return safenonce(...args);
};

export const paymentConfirmation = (...args) => {
  const safenonce = handleServerErrors(baseAPI.paymentConfirmation);
  return safenonce(...args);
};
