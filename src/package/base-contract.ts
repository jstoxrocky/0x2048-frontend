import * as interfaces from './interfaces';
import { arcadeContract } from './deployed-contracts';
import { gasPrice, gas } from './web3-provisioned';

export const basePay: (
  data: interfaces.Challenge,
  user: string,
  price: number,
) => Promise<interfaces.TransactionReceipt> = async (data, user, price) => (
  arcadeContract.methods
    .pay(data.nonce)
    .send({ gas, gasPrice, from: user, value: price })
);

export const baseUploadScore: (
  data: interfaces.SignedScore,
  user: string,
) => Promise<interfaces.TransactionReceipt> = async (data, user) => (
  arcadeContract.methods
    .uploadScore(data.v, data.r, data.s, data.recoveredAddress, data.score)
    .send({ gas, gasPrice, from: user })
);
