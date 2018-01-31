import * as exceptions from './exceptions';
import { web3, Network } from './web3-provisioned';

export const requireWeb3Provider = () => {
  if (typeof web3 === 'undefined') {
    throw exceptions.NoWeb3Provider;
  }
  return true;
};

export const requireAccountsAvailable = async () => {
  const [user] = await web3.eth.getAccounts();
  if (!user) {
    throw exceptions.NoAccountsAvailable;
  }
  return true;
};

export const requireCorrectNetwork = async () => {
  let netId = null;
  try {
    netId = await web3.eth.net.getId();
  } catch (err) {
    throw exceptions.CantFetchNetwork;
  }
  if (netId !== Network) {
    throw exceptions.WrongNetwork;
  }
  return true;
};

export const connectedToEVM = async () => {
  requireWeb3Provider();
  await requireAccountsAvailable();
  await requireCorrectNetwork();
  return true;
};
