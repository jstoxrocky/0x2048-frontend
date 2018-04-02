import jsonschema from 'jsonschema';
import * as api from './api';
import * as arcadeContract from './arcade-contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';
import signNonce from './sign-nonce';
import * as schemas from './schemas';
import * as exceptions from './exceptions';

export const gameState = async () => (
  api.gameState()
);

export const move = async (direction) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const move = { user, direction }
  const gameState = await api.move(move);
  return gameState;
};

export const newGame = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const challenge = await api.nonce();
  const signature = await signNonce(user, challenge.nonce);
  const price = await arcadeContract.getPrice();
  const payment = { user, price, nonce: challenge.nonce }
  const txreceipt = await arcadeContract.pay(payment);
  const receipt = { signature, txhash: txreceipt.transactionHash };
  const gameState = await api.paymentConfirmation(receipt);
  const arcadeState = await arcadeContract.getArcadeState();
  return { gameState, arcadeState };
};

export const getArcadeState = async () => {
  await connectedToEVM();
  const arcadeState = await arcadeContract.getArcadeState();
  return arcadeState;
};

export const uploadScore = async (v, r, s, score) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const signedScore = { v, r, s, user, score };
  const arcadeState = await arcadeContract.uploadScore(signedScore);
  return arcadeState;
};
