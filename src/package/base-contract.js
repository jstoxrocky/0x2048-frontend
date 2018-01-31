import contractPromise from './deployed-contract';
import { gasPrice, gas } from './web3-provisioned';

const toDecimal = value => (
  parseInt(value, 10)
);

export const getAddress = async () => {
  const contract = await contractPromise;
  return contract._address; // eslint-disable-line no-underscore-dangle
};

export const unhandledPay = async (user, value) => {
  const contract = await contractPromise;
  const options = {
    gas, gasPrice, from: user, value,
  };
  return contract.methods.pay().send(options);
};

export const unhandledUploadScore = async (user, h, v, r, s, userPreImage, scorePreImage) => {
  const contract = await contractPromise;
  const options = { gas, gasPrice, from: user };
  return contract.methods.uploadScore(h, v, r, s, userPreImage, scorePreImage).send(options);
};

export const unhandledAdjustPrice = async (h, v, r, s, user, pricePreImage) => {
  const contract = await contractPromise;
  const options = { gas, gasPrice, from: user };
  return contract.methods.adjustPrice(h, v, r, s, user, pricePreImage).send(options);
};

export const unhandledGetRound = async () => {
  const contract = await contractPromise;
  return contract.methods.round().call().then(toDecimal);
};

export const unhandledGetJackpot = async () => {
  const contract = await contractPromise;
  return contract.methods.jackpot().call().then(toDecimal);
};

export const unhandledGetPrice = async () => {
  const contract = await contractPromise;
  return contract.methods.price().call().then(toDecimal);
};

export const unhandledGetParticipation = async (user) => {
  const contract = await contractPromise;
  return contract.methods.getParticipation(user).call();
};

export const getContract = () => (
  contractPromise
);
