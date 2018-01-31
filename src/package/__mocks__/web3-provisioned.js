import Web3 from 'web3';
import ganache from 'ganache-core';

export const web3 = new Web3();
export const startingBalance = web3.utils.toWei('100', 'ether');
export const owner = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('1'));
export const notOwner = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('2'));
export const user = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('3'));
export const Network = 1337;
export const options = {
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
  network_id: Network,
  blocktime: 1,
  logger: {
    log: () => {},
  },
};
export const testProvider = ganache.provider(options);
web3.setProvider(testProvider);
export const fromWei = wei => web3.utils.fromWei(wei, 'ether');
export const gas = 4000000;
export const gasPrice = 2000000000;
