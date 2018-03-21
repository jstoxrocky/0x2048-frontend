import Web3 from 'web3/packages/web3';
import { handleMetaMaskErrors } from './decorators';
import * as exceptions from './exceptions';
import * as baseContract from './base-arcade-contract';

const web3 = new Web3();

export const handledUploadScore = (...args) => {
  const safeUploadScore = handleMetaMaskErrors(baseContract.uploadScore);
  return safeUploadScore(...args);
};

export const {
  getAddress,
  getRound,
  getJackpot,
  getHighscore,
} = baseContract;

export const getArcadeState = async () => {
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return {
    jackpot, round, highscore,
  };
};

export const uploadScore = async (signature, user, scorePreImage) => {
  const { status } = await handledUploadScore(
    signature.messageHash, signature.v, signature.r, signature.s,
    user, scorePreImage,
  );
  if (web3.utils.hexToNumber(status) !== 1) {
    throw exceptions.TransactionFailure;
  }
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
