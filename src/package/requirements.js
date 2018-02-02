import * as exceptions from './exceptions';
import { web3, network } from './web3-provisioned';

export const web3Provider = () => {
  if (typeof web3 === 'undefined') {
    throw exceptions.NoWeb3Provider;
  }
  return true;
};

export const accountsAvailable = async () => {
  const [user] = await web3.eth.getAccounts();
  if (!user) {
    throw exceptions.NoAccountsAvailable;
  }
  return true;
};

export const correctNetwork = async () => {
  let netId = null;
  try {
    netId = await web3.eth.net.getId();
  } catch (err) {
    throw exceptions.CantFetchNetwork;
  }
  if (netId !== network) {
    throw exceptions.WrongNetwork;
  }
  return true;
};

export const connectedToEVM = async () => {
  web3Provider();
  await accountsAvailable();
  await correctNetwork();
  return true;
};
