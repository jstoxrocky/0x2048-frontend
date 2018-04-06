import { arcadeContract } from './deployed-contracts';
import { handleEVMErrors, handleMetaMaskErrors } from './decorators';
import * as interfaces from './interfaces';
import * as baseContract from './base-contract';

const toDecimal = (value: string) => (
  parseInt(value, 10)
);

export const getAddress = (): string => (
  arcadeContract.options.address
);

export const getRound = (): Promise<number> => (
  arcadeContract.methods.round().call().then(toDecimal)
);

export const getJackpot = (): Promise<number> => (
  arcadeContract.methods.jackpot().call().then(toDecimal)
);

export const getPrice = (): Promise<number> => (
  arcadeContract.methods.price().call().then(toDecimal)
);

export const getHighscore = (): Promise<number> => (
  arcadeContract.methods.highscore().call().then(toDecimal)
);

export const getArcadeState = async (): Promise<interfaces.ArcadeState> => {
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};

export const pay: (
  data: interfaces.Challenge,
  user: string,
  price: number,
) => Promise<interfaces.TransactionReceipt> = async (data, user, price) => {
  const safePay = handleEVMErrors(handleMetaMaskErrors(baseContract.basePay));
  const txReceipt = await safePay(data, user, price);
  return txReceipt;
};

export const uploadScore: (
  data: interfaces.SignedScore,
  user: string,
) => Promise<interfaces.ArcadeState> = async (data, user) => {
  const safeUploadScore = handleEVMErrors(handleMetaMaskErrors(baseContract.baseUploadScore));
  await safeUploadScore(data, user);
  const jackpot = await getJackpot();
  const round = await getRound();
  const highscore = await getHighscore();
  return { jackpot, round, highscore };
};
