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

export const basePay = async (nonce, user, price) => (
  arcadeContract.methods
    .pay(nonce)
    .send({
      gas, gasPrice, from: user, value: price,
    })
);

export const pay = async (challenge, user, price) => {
  const safePay = handleEVMErrors(handleMetaMaskErrors(basePay));
  const receipt = await safePay(
    challenge.nonce,
    user,
    price,
  );
  return receipt;
};

export const baseUploadScore = (signedScore, user) => (
  arcadeContract.methods
    .uploadScore(
      signedScore.v,
      signedScore.r,
      signedScore.s,
      signedScore.recoveredAddress,
      signedScore.score,
    )
    .send({ gas, gasPrice, from: user })
);

export const uploadScore = async (signedScore, user) => {
  const safeUploadScore = handleEVMErrors(handleMetaMaskErrors(baseUploadScore));
  await safeUploadScore(signedScore, user);
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
