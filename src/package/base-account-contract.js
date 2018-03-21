import { accountContract } from './deployed-contracts';
import { gasPrice, gas } from './web3-provisioned';

export const deposit = (user, value) => (
  accountContract.methods
    .deposit()
    .send({
      gas, gasPrice, value, from: user,
    })
);

export const withdraw = user => (
  accountContract.methods
    .withdraw()
    .send({ gas, gasPrice, from: user })
);

export const getAddress = () => (
  accountContract._address // eslint-disable-line no-underscore-dangle
);

export const balanceOf = user => (
  accountContract.methods.balanceOf(user).call().then(x => parseInt(x, 10))
);

export const timeoutOf = user => (
  accountContract.methods.timeoutOf(user).call().then(x => parseInt(x, 10))
);

export const getNonce = user => (
  accountContract.methods.getNonce(user).call().then(x => parseInt(x, 10))
);
