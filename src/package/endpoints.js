import * as api from './api';
import * as Contract from './contract';
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
  // (1) Fetch next IOU from server (GET /iou)
  // (2) Prompt user to sign next IOU
  // (3) Submit IOU (POST /iou)
  // (4) Start new game (POST /move)
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
  const [user] = await web3.eth.getAccounts();
  return Contract.getArcadeState(user);
};

export const uploadScore = async (signature, score) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.uploadScore(signature, user, score);
};
