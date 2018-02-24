import Web3 from 'web3/packages/web3';

export const web3 = new Web3();
web3.setProvider(web3.givenProvider);
export const fromWei = wei => web3.utils.fromWei(wei, 'ether');
export const gas = 4000000;
export const gasPrice = 2000000000;
export const network = 4; // Rinkeby
