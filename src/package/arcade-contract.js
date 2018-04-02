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

export const pay = async payment => {
  const safePay = handleEVMErrors(handleMetaMaskErrors(basePay));
  const receipt = await safePay(
    payment.user,
    payment.nonce,
    payment.price,
  );
  return receipt;
};

export const baseUploadScore = (signedScore) => (
  arcadeContract.methods
    .uploadScore(
      signedScore.v,
      signedScore.r,
      signedScore.s,
      signedScore.user,
      signedScore.score,
    )
    .send({ gas, gasPrice, from: signedScore.user })
);

export const uploadScore = async (signedScore) => {
  const safeUploadScore = handleEVMErrors(handleMetaMaskErrors(baseUploadScore));
  await safeUploadScore(signedScore);
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
