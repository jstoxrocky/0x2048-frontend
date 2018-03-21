import { arcadeContract } from './deployed-contracts';
import { gasPrice, gas } from './web3-provisioned';

const toDecimal = value => (
  parseInt(value, 10)
);

export const pay = (user, value) => (
  arcadeContract.methods
    .pay()
    .send({
      gas, gasPrice, value, from: user,
    })
);

export const uploadScore = (h, v, r, s, user, scorePreImage) => (
  arcadeContract.methods
    .uploadScore(h, v, r, s, user, scorePreImage)
    .send({ gas, gasPrice, from: user })
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
