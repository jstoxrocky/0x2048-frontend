import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as api from '../../src/package/api';
import * as web3Provisioned from '../../src/package/web3-provisioned';
import * as test from '../testnet-config';
import * as accounts from '../accounts';
import createIOU from '../../src/package/iou';

web3Provisioned.web3 = new Web3();
const provider = ganache.provider(test.options);
web3Provisioned.web3.setProvider(provider);

export default async () => {
  const value = 100;
  const iou = await createIOU(accounts.user.address, value);
  await api.postIOU(iou);
};
