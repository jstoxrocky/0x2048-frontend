import * as api from './api';
import * as Contract from './contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';

export const move = async (direction) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return api.move(user, direction);
};

export const gameState = async () => (
  api.gameState()
);

export const postIOU = async (signature) => {
  await connectedToEVM();
  return api.postIOU(signature);
};

export const getIOU = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return api.getIOU(user);
};

export const getArcadeState = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.getArcadeState(user);
};

export const uploadScore = async (signature, score) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.uploadScore(signature, user, score);
};
