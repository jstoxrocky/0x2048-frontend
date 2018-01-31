import { handleServerErrors } from './decorators';
import { unhandledMove, unhandledPrice } from '../../src/package/base-api';

export const move = (...args) => {
  const safeMove = handleServerErrors(unhandledMove);
  return safeMove(...args);
};

export const price = (...args) => {
  const safePrice = handleServerErrors(unhandledPrice);
  return safePrice(...args);
};
