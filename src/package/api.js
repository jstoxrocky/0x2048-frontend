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

export const postIOU = (...args) => {
  const safePostIOU = handleServerErrors(baseAPI.postIOU);
  return safePostIOU(...args);
};

export const getIOU = (...args) => {
  const safeGetIOU = handleServerErrors(baseAPI.getIOU);
  return safeGetIOU(...args);
};
