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

export const getHighscore = () => (
  arcadeContract.methods.highscore().call().then(toDecimal)
);

export const getArcadeState = async () => {
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};

export const baseUploadScore = (messageHash, v, r, s, user, scorePreImage) => (
  arcadeContract.methods
    .uploadScore(messageHash, v, r, s, user, scorePreImage)
    .send({ gas, gasPrice, from: user })
);

export const uploadScore = async (messageHash, v, r, s, user, scorePreImage) => {
  const safeUploadScore = handleEVMErrors(handleMetaMaskErrors(baseUploadScore));
  await safeUploadScore(messageHash, v, r, s, user, scorePreImage);
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
