import { web3, gasPrice, gas } from '../src/package/web3-provisioned';
import * as accounts from './accounts';

const startingBalance = web3.utils.toWei('100', 'ether');
export const deploymentOptions = { from: accounts.owner.address, gasPrice, gas };
export const network = 1337;
export const options = {
  accounts: [{
    balance: startingBalance,
    secretKey: accounts.user.privateKey,
  }, {
    balance: startingBalance,
    secretKey: accounts.user2.privateKey,
  },
  {
    balance: startingBalance,
    secretKey: accounts.owner.privateKey,
  }],
  network_id: network,
  blocktime: 1.5,
};
