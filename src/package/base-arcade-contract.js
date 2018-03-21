import { contract } from './deployed-contracts';
import { gasPrice, gas } from './web3-provisioned';

const toDecimal = value => (
  parseInt(value, 10)
);

export const pay = (user, value) => (
  contract.methods
    .pay()
    .send({
      gas, gasPrice, value, from: user,
    })
);

export const uploadScore = (h, v, r, s, user, scorePreImage) => (
  contract.methods
    .uploadScore(h, v, r, s, user, scorePreImage)
    .send({ gas, gasPrice, from: user })
);


export const getAddress = () => (
  contract._address // eslint-disable-line no-underscore-dangle
);

export const getRound = () => (
  contract.methods.round().call().then(toDecimal)
);

export const getJackpot = () => (
  contract.methods.jackpot().call().then(toDecimal)
);

export const getHighscore = () => (
  contract.methods.highscore().call().then(toDecimal)
);
