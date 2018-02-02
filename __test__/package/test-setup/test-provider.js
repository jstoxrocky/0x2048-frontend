import ganache from 'ganache-core';
import { web3, gasPrice, gas } from '../../../src/package/web3-provisioned';

const startingBalance = web3.utils.toWei('100', 'ether');
export const owner = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('1'));
export const notOwner = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('2'));
export const user = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('3'));
export const network = 1337;
const options = {
  accounts: [{
    balance: startingBalance,
    secretKey: user.privateKey,
  }, {
    balance: startingBalance,
    secretKey: notOwner.privateKey,
  },
  {
    balance: startingBalance,
    secretKey: owner.privateKey,
  }],
  network_id: network,
  blocktime: 1.5,
  logger: {
    log: () => {},
  },
};
export const provider = ganache.provider(options);
export const deploymentOptions = { from: owner.address, gasPrice, gas };
