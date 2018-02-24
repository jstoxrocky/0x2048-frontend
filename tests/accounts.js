import { web3 } from '../src/package/web3-provisioned';

export const owner = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('1'));
export const user = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('3'));
export const user2 = web3.eth.accounts.privateKeyToAccount(web3.utils.sha3('2'));
