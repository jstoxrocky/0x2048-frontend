import { handleMetaMaskErrors } from './decorators';
import * as exceptions from './exceptions';
import * as baseContract from './base-contract';

export const { getAddress } = baseContract;
export const handledGetRound = (...args) => {
  const safeGetRound = handleMetaMaskErrors(baseContract.unhandledGetRound);
  return safeGetRound(...args);
};
export const handledGetJackpot = (...args) => {
  const safeGetJackpot = handleMetaMaskErrors(baseContract.unhandledGetJackpot);
  return safeGetJackpot(...args);
};
export const handledGetPrice = (...args) => {
  const safeGetPrice = handleMetaMaskErrors(baseContract.unhandledGetPrice);
  return safeGetPrice(...args);
};
export const handledGetParticipation = (...args) => {
  const safeGetParticipation = handleMetaMaskErrors(baseContract.unhandledGetParticipation);
  return safeGetParticipation(...args);
};
export const handledPay = (...args) => {
  const safePay = handleMetaMaskErrors(baseContract.unhandledPay);
  return safePay(...args);
};
export const handledUploadScore = (...args) => {
  const safeUploadScore = handleMetaMaskErrors(baseContract.unhandledUploadScore);
  return safeUploadScore(...args);
};
export const handledAdjustPrice = (...args) => {
  const safeAdjustPrice = handleMetaMaskErrors(baseContract.unhandledAdjustPrice);
  return safeAdjustPrice(...args);
};

export const getArcadeState = async (user) => {
  const jackpot = await handledGetJackpot();
  const round = await handledGetRound();
  const isParticipant = await handledGetParticipation(user);
  const price = await handledGetPrice();
  return {
    jackpot, round, isParticipant, price,
  };
};

export const pay = async (user) => {
  let isParticipant = await handledGetParticipation(user);
  if (isParticipant) {
    throw exceptions.UserAlreadyPaid;
  }
  const value = await handledGetPrice();
  const receipt = await handledPay(user, value);
  if (!receipt.status) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await handledGetJackpot();
  isParticipant = await handledGetParticipation(user);
  return { jackpot, isParticipant };
};

export const uploadScore = async (signature, user, userPreImage, scorePreImage) => {
  let isParticipant = await handledGetParticipation(userPreImage);
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
  const jackpot = await handledGetJackpot();
  const round = await handledGetRound();
  isParticipant = await handledGetParticipation(user);
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
  const price = await handledGetPrice();
  return { price };
};
