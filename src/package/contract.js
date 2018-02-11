import Web3 from 'web3';
import { handleMetaMaskErrors } from './decorators';
import * as exceptions from './exceptions';
import * as baseContract from './base-contract';

const web3 = new Web3();

export const handledPay = (...args) => {
  const safePay = handleMetaMaskErrors(baseContract.pay);
  return safePay(...args);
};
export const handledUploadScore = (...args) => {
  const safeUploadScore = handleMetaMaskErrors(baseContract.uploadScore);
  return safeUploadScore(...args);
};
export const handledAdjustPrice = (...args) => {
  const safeAdjustPrice = handleMetaMaskErrors(baseContract.adjustPrice);
  return safeAdjustPrice(...args);
};

export const {
  getAddress,
  getRound,
  getJackpot,
  getPrice,
  getParticipation,
} = baseContract;

export const getArcadeState = async (user) => {
  const jackpot = await getJackpot();
  const round = await getRound();
  const isParticipant = await getParticipation(user);
  const price = await getPrice();
  return {
    jackpot, round, isParticipant, price,
  };
};

export const pay = async (user) => {
  let isParticipant = await getParticipation(user);
  if (isParticipant) {
    throw exceptions.UserAlreadyPaid;
  }
  const value = await getPrice();
  const { status } = await handledPay(user, value);
  if (web3.utils.hexToNumber(status) !== 1) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await getJackpot();
  isParticipant = await getParticipation(user);
  return { jackpot, isParticipant };
};

export const uploadScore = async (signature, user, scorePreImage) => {
  let isParticipant = await getParticipation(user);
  if (!isParticipant) {
    throw exceptions.UserHasNotPaid;
  }
  const { status } = await handledUploadScore(
    signature.messageHash, signature.v, signature.r, signature.s,
    user, scorePreImage,
  );
  if (web3.utils.hexToNumber(status) !== 1) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await getJackpot();
  const round = await getRound();
  isParticipant = await getParticipation(user);
  return { jackpot, round, isParticipant };
};

export const adjustPrice = async (signature, user, pricePreImage) => {
  const { status } = await handledAdjustPrice(
    signature.messageHash, signature.v, signature.r, signature.s,
    user, pricePreImage,
  );
  if (web3.utils.hexToNumber(status) !== 1) {
    throw exceptions.TransactionFailure;
  }
  const price = await getPrice();
  return { price };
};
