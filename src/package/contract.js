import { handleMetaMaskErrors } from './decorators';
import * as exceptions from './exceptions';
import * as baseContract from './base-contract';

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
  const receipt = await handledPay(user, value);
  if (!receipt.status) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await getJackpot();
  isParticipant = await getParticipation(user);
  return { jackpot, isParticipant };
};

export const uploadScore = async (signature, user, userPreImage, scorePreImage) => {
  let isParticipant = await getParticipation(userPreImage);
  if (!isParticipant) {
    throw exceptions.UserHasNotPaid;
  }
  const receipt = await handledUploadScore(
    user,
    signature.messageHash, signature.v, signature.r, signature.s,
    userPreImage, scorePreImage,
  );
  if (!receipt.status) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await getJackpot();
  const round = await getRound();
  isParticipant = await getParticipation(user);
  return { jackpot, round, isParticipant };
};

export const adjustPrice = async (signature, user, pricePreImage) => {
  const receipt = await handledAdjustPrice(
    signature.messageHash, signature.v, signature.r, signature.s,
    user, pricePreImage,
  );
  if (!receipt.status) {
    throw exceptions.TransactionFailure;
  }
  const price = await getPrice();
  return { price };
};
