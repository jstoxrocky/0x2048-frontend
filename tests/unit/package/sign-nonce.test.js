import ganache from 'ganache-core';
import Web3 from 'web3/packages/web3';
import * as ethAbi from 'ethereumjs-abi';
import * as utils from 'ethereumjs-util';
import * as _ from 'lodash';
import * as GethApiDouble from 'ganache-core/lib/subproviders/geth_api_double';
import * as accounts from '../../accounts';
import signNonce from '../../../src/package/sign-nonce';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';

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

describe('signNonce', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('signer should be known user', async () => {
    const nonce = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
    const signature = await signNonce(accounts.user.address, nonce);
    const msgParams = [
      {
        type: 'string',
        name: 'This signature is for intended for use with 0x2048 at the below Rinkeby address. If you are seeing this message and not interacting with 0x2048, someone may be attempting forge your signature',
        value: deployedContract.arcadeAddress,
      },
      {
        type: 'bytes32',
        name: 'nonce',
        value: nonce,
      },
    ];
    const data = _.map(msgParams, 'value');
    const types = _.map(msgParams, 'type');
    const schema = _.map(msgParams, entry => `${entry.type} ${entry.name}`);
    const hashBuffer = ethAbi.soliditySHA3(
      ['bytes32', 'bytes32'],
      [
        ethAbi.soliditySHA3(_.times(msgParams.length, _.constant('string')), schema),
        ethAbi.soliditySHA3(types, data),
      ],
    );
    const hash = `0x${hashBuffer.toString('hex')}`;
    const isPrefixed = true;
    const signer = web3Provisioned.web3.eth.accounts.recover(hash, signature, isPrefixed);
    expect(signer).toBe(accounts.user.address);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
