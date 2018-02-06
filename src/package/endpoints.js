import * as api from './api';
import * as Contract from './contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';

export const move = async (direction) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return api.move(user, direction);
};

export const getArcadeState = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.getArcadeState(user);
};

export const gameState = async () => (
  api.gameState()
);

export const pay = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.pay(user);
};

export const uploadScore = async (signature, userPreImage, scorePreImage) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return Contract.uploadScore(signature, user, userPreImage, scorePreImage);
};

export const adjustPrice = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  const { signature, price } = await api.price(user);
  return Contract.adjustPrice(signature, user, price);
};
