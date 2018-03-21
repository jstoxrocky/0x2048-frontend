import * as api from './api';
import * as arcadeContract from './arcade-contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';
import createIOU from './iou';

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

export const newGame = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const { nonce } = await api.nonce(user);
  const nextNonce = nonce + 1;
  const signedIOU = await createIOU(user, nextNonce);
  const payload = await api.iou(signedIOU);
  return payload;
};

export const getArcadeState = async () => {
  await connectedToEVM();
  const state = await arcadeContract.getArcadeState();
  return state;
};

export const uploadScore = async (messageHash, v, r, s, score) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return arcadeContract.uploadScore(messageHash, v, r, s, user, score);
};
