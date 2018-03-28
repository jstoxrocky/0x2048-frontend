import { arcadeContract } from './deployed-contracts';
import { gasPrice, gas } from './web3-provisioned';
import { handleEVMErrors, handleMetaMaskErrors } from './decorators';

const toDecimal = value => (
  parseInt(value, 10)
);

export const getAddress = () => (
  arcadeContract._address // eslint-disable-line no-underscore-dangle
);

export const getRound = () => (
  arcadeContract.methods.round().call().then(toDecimal)
);

export const getJackpot = () => (
  arcadeContract.methods.jackpot().call().then(toDecimal)
);

export const getPrice = () => (
  arcadeContract.methods.price().call().then(toDecimal)
);

export const getHighscore = () => (
  arcadeContract.methods.highscore().call().then(toDecimal)
);

export const getArcadeState = async () => {
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};

export const basePay = async (user, nonce, price) => (
  arcadeContract.methods
    .pay(nonce)
    .send({
      gas, gasPrice, from: user, value: price,
    })
);

export const pay = async (user, nonce) => {
  const price = await getPrice();
  const safePay = handleEVMErrors(handleMetaMaskErrors(basePay));
  await safePay(user, nonce, price);
  return true;
};

export const baseUploadScore = (v, r, s, user, score) => (
  arcadeContract.methods
    .uploadScore(v, r, s, user, score)
    .send({ gas, gasPrice, from: user })
);

export const uploadScore = async (v, r, s, user, score) => {
  const safeUploadScore = handleEVMErrors(handleMetaMaskErrors(baseUploadScore));
  await safeUploadScore(v, r, s, user, score);
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
