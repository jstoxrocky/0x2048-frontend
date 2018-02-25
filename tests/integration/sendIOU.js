import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import merge from 'lodash/merge';
import * as api from '../../src/package/api';
import * as web3Provisioned from '../../src/package/web3-provisioned';
import * as deployedContract from '../../src/package/deployed-contract';
import * as test from '../testnet-config';
import * as accounts from '../accounts';

web3Provisioned.web3 = new Web3();
const provider = ganache.provider(test.options);
web3Provisioned.web3.setProvider(provider);

export default async () => {
  const value = 100;
  const msg = Web3.utils.soliditySha3(
    { type: 'address', value: deployedContract.accountAddress },
    { type: 'address', value: accounts.user.address },
    { type: 'uint256', value },
  );
  const signature = web3Provisioned.web3.eth.accounts.sign(msg, accounts.user.privateKey);
  const { v } = signature;
  const signed = merge(
    {},
    { signature: merge({}, signature, { v: Web3.utils.hexToNumber(v) }) },
    { user: accounts.user.address, value },
  );
  await api.postIOU(signed);
};
