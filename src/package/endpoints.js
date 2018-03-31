import jsonschema from 'jsonschema';
import * as api from './api';
import * as arcadeContract from './arcade-contract';
import { web3 } from './web3-provisioned';
import { connectedToEVM } from './requirements';
import signNonce from './sign-nonce';
import * as schemas from './schemas';
import * as exceptions from './exceptions';

export const move = async (direction) => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  return api.move(user, direction);
};

export const gameState = async () => (
  api.gameState()
);

export const newGame = async () => {
  await connectedToEVM();
  const [user] = await web3.eth.getAccounts();
  // Get nonce
  const noncePayload = await api.nonce();
  const nonceValidator = new jsonschema.Validator();
  const nonceValidation = nonceValidator.validate(noncePayload, schemas.nonceSchema);
  if (nonceValidation.errors.length > 0) {
    throw exceptions.ValidationError;
  }
  const { nonce } = noncePayload;
  // Sign nonce
  const signature = await signNonce(user, nonce);
  // Pay and confirm address
  await arcadeContract.pay(user, nonce);
  await api.addressConfirmation(signature);
  // Confirm payment
  const gamestate = await api.paymentConfirmation();
  const gameStateValidator = new jsonschema.Validator();
  gameStateValidator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
  gameStateValidator.addSchema(schemas.fullSignatureSchema, '/fullSignatureSchema');
  gameStateValidator.addSchema(schemas.gamestateSchema, '/gamestateSchema');
  const gameStateValidation = gameStateValidator.validate(
    gamestate,
    schemas.signedGamestateSchema,
  );
  if (gameStateValidation.errors.length > 0) {
    throw exceptions.ValidationError;
  }
  // TODO
  // Should update Jackpot
  return gamestate;
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
