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

export const iou = async (signature) => {
  await connectedToEVM();
  return api.iou(signature);
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
