import * as exceptions from './exceptions';

export const handleMetaMaskErrors = f => (
  async (...args) => {
    let result = null;
    try {
      result = await f(...args);
    } catch (err) {
      throw exceptions.MetamaskError;
    }
    return result;
  }
);

export const handleServerErrors = f => (
  async (...args) => {
    let receipt = null;
    try {
      receipt = await f(...args);
    } catch (err) {
      throw exceptions.ServerError;
    }
    return receipt;
  }
);
