import * as api from './api';
import * as arcadeContract from './arcade-contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';
import signNonce from './sign-nonce';

export const gameState = async () => (
  api.gameState()
);

export const move = async (direction) => {
  const userMove = { direction };
  const nextGameState = await api.move(userMove);
  return nextGameState;
};

export const newGame = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const challenge = await api.nonce();
  const signature = await signNonce(user, challenge.nonce);
  const price = await arcadeContract.getPrice();
  const txreceipt = await arcadeContract.pay(challenge, user, price);
  const receipt = { signature, txhash: txreceipt.transactionHash };
  const nextGameState = await api.paymentConfirmation(receipt);
  const arcadeState = await arcadeContract.getArcadeState();
  return { gameState: nextGameState, arcadeState };
};

export const getArcadeState = async () => {
  await connectedToEVM();
  const arcadeState = await arcadeContract.getArcadeState();
  return arcadeState;
};

export const uploadScore = async (v, r, s, recoveredAddress, score) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const signedScore = {
    v, r, s, recoveredAddress, score,
  };
  const arcadeState = await arcadeContract.uploadScore(signedScore, user);
  return arcadeState;
};
