import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as GethApiDouble from 'ganache-core/lib/subproviders/geth_api_double';
import * as ethAbi from 'ethereumjs-abi';
import * as utils from 'ethereumjs-util';
import * as _ from 'lodash';
import * as api from '../../src/package/api';
import * as web3Provisioned from '../../src/package/web3-provisioned';
import * as test from '../testnet-config';
import * as accounts from '../accounts';
import createIOU from '../../src/package/iou';

// Mock eth_signTypedData
const account = {
  secretKey: accounts.user.privateKey,
};

GethApiDouble.default.prototype.eth_signTypedData = (typedData, address, callback) => {
  const secretKey = Buffer.from(account.secretKey.replace('0x', ''), 'hex');
  const data = _.map(typedData, 'value');
  const types = _.map(typedData, 'type');
  const schema = _.map(typedData, entry => `${entry.type} ${entry.name}`);
  const hash = ethAbi.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      ethAbi.soliditySHA3(_.times(typedData.length, _.constant('string')), schema),
      ethAbi.soliditySHA3(types, data),
    ],
  );
  const vrs = utils.ecsign(hash, secretKey);
  const signature = utils.toRpcSig(vrs.v, vrs.r, vrs.s);
  const error = null;
  callback(error, signature);
};

web3Provisioned.web3 = new Web3();
const provider = ganache.provider(test.options);
web3Provisioned.web3.setProvider(provider);

export default async () => {
  const value = 100;
  const iou = await createIOU(accounts.user.address, value);
  await api.postIOU(iou);
};
