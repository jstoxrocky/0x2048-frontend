import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as ethAbi from 'ethereumjs-abi';
import * as utils from 'ethereumjs-util';
import * as _ from 'lodash';
import * as GethApiDouble from 'ganache-core/lib/subproviders/geth_api_double';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import signTypedData from '../../../src/package/signTypedData';

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

describe('signTypedData', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should match metamask result with one string argument', async () => {
    const metamaskSignature = '0xa253e8787536bb678771110c4fe69d540d9f9620b264b025f1a1611fdbe8968e6ada6a2e6aea466bab532146d33619704fff36746ab047129bcd3f887634e25a1c';
    const metamaskVRS = utils.fromRpcSig(metamaskSignature);
    const msgParams = [
      {
        type: 'string',
        name: 'x',
        value: 'x',
      },
    ];
    const signature = await signTypedData(msgParams, accounts.user.address);
    const sgn = utils.stripHexPrefix(signature);
    const r = Buffer.from(sgn.slice(0, 64), 'hex');
    const s = Buffer.from(sgn.slice(64, 128), 'hex');
    const v = parseInt(sgn.slice(128, 130), 16) + 27;
    expect(v).toEqual(metamaskVRS.v);
    expect(r).toEqual(metamaskVRS.r);
    expect(s).toEqual(metamaskVRS.s);
  });

  it('should match metamask result with one number argument', async () => {
    const metamaskSignature = '0x6b61ae244930fc022ac3fd5ec533faa79dfeef38900d6f96ce70bc17867cb3100a34de90809e74d67da7adc73a0a5ba96ad743fa3e7add9d07f97383e113959a1c';
    const metamaskVRS = utils.fromRpcSig(metamaskSignature);
    const msgParams = [
      {
        type: 'uint256',
        name: 'x',
        value: '1',
      },
    ];
    const signature = await signTypedData(msgParams, accounts.user.address);
    const sgn = utils.stripHexPrefix(signature);
    const r = Buffer.from(sgn.slice(0, 64), 'hex');
    const s = Buffer.from(sgn.slice(64, 128), 'hex');
    const v = parseInt(sgn.slice(128, 130), 16) + 27;
    expect(v).toEqual(metamaskVRS.v);
    expect(r).toEqual(metamaskVRS.r);
    expect(s).toEqual(metamaskVRS.s);
  });

  it('should match metamask result with two string arguments', async () => {
    const metamaskSignature = '0x2fdaccf7ec53385aaf1dc071b9758546c7f9937352700179837eab05192c01930509416d6822d19572559a720529a7511d5c2968e6cb6adb63b0814a3157ed611b';
    const metamaskVRS = utils.fromRpcSig(metamaskSignature);
    const msgParams = [
      {
        type: 'string',
        name: 'x',
        value: 'x',
      },
      {
        type: 'string',
        name: 'y',
        value: 'y',
      },
    ];
    const signature = await signTypedData(msgParams, accounts.user.address);
    const sgn = utils.stripHexPrefix(signature);
    const r = Buffer.from(sgn.slice(0, 64), 'hex');
    const s = Buffer.from(sgn.slice(64, 128), 'hex');
    const v = parseInt(sgn.slice(128, 130), 16) + 27;
    expect(v).toEqual(metamaskVRS.v);
    expect(r).toEqual(metamaskVRS.r);
    expect(s).toEqual(metamaskVRS.s);
  });

  it('should match metamask result with one string and one number argument', async () => {
    const metamaskSignature = '0x053458d310a8ae5810fcd46a0eec07206449a860bb075126db5108361ff1234f36434152cd1e9413f1eda43da9db3562a212ad23c0e89239e950e9dd89c35db81c';
    const metamaskVRS = utils.fromRpcSig(metamaskSignature);
    const msgParams = [
      {
        type: 'string',
        name: 'x',
        value: 'x',
      },
      {
        type: 'uint256',
        name: 'y',
        value: 1,
      },
    ];
    const signature = await signTypedData(msgParams, accounts.user.address);
    const sgn = utils.stripHexPrefix(signature);
    const r = Buffer.from(sgn.slice(0, 64), 'hex');
    const s = Buffer.from(sgn.slice(64, 128), 'hex');
    const v = parseInt(sgn.slice(128, 130), 16) + 27;
    expect(v).toEqual(metamaskVRS.v);
    expect(r).toEqual(metamaskVRS.r);
    expect(s).toEqual(metamaskVRS.s);
  });

  it('should match metamask result with the eip example arguments', async () => {
    const metamaskSignature = '0xd3cacf1d6fef0b84a21253526daed7c578b67361eaf52acb5b82c8ddc071bc140aa92fe3aa2e2053c2b035e528d82a464c67ef26c12b6f7d78b197bd29bc4c551b';
    const metamaskVRS = utils.fromRpcSig(metamaskSignature);
    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!',
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337',
      },
    ];
    const signature = await signTypedData(msgParams, accounts.user.address);
    const sgn = utils.stripHexPrefix(signature);
    const r = Buffer.from(sgn.slice(0, 64), 'hex');
    const s = Buffer.from(sgn.slice(64, 128), 'hex');
    const v = parseInt(sgn.slice(128, 130), 16) + 27;
    expect(v).toEqual(metamaskVRS.v);
    expect(r).toEqual(metamaskVRS.r);
    expect(s).toEqual(metamaskVRS.s);
  });

  it('should recover signer to be test user', async () => {
    const typedData = [
      {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!',
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337',
      },
    ];
    const signature = await signTypedData(typedData, accounts.user.address);
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
    const hexHash = utils.addHexPrefix(hash.toString('hex'));
    const signer = web3Provisioned.web3.eth.accounts.recover(hexHash, signature, true);
    expect(signer).toBe(accounts.user.address);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
