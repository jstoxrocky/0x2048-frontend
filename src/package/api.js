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

export const iou = (...args) => {
  const safeIou = handleServerErrors(baseAPI.iou);
  return safeIou(...args);
};
