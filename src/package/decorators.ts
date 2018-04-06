import Web3 from 'web3';
import * as exceptions from './exceptions';

const web3 = new Web3();

export const handleMetaMaskErrors = (f: any) => (
  async (...args: any[]) => {
    let result = null;
    try {
      result = await f(...args);
    } catch (err) {
      throw exceptions.MetamaskError;
    }
    return result;
  }
);

export const handleEVMErrors = (f: any) => (
  async (...args: any[]) => {
    let result = null;
    result = await f(...args);
    if (web3.utils.hexToNumber(result.status) !== 1) {
      throw exceptions.TransactionFailure;
    }
    return result;
  }
);

export const handleServerErrors = (f: any) => (
  async (...args: any[]) => {
    let receipt = null;
    try {
      receipt = await f(...args);
    } catch (err) {
      throw exceptions.ServerError;
    }
    return receipt;
  }
);
