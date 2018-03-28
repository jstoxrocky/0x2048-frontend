import ganache from 'ganache-core';
import jsonschema from 'jsonschema';
import Web3 from 'web3/packages/web3';
import * as ethAbi from 'ethereumjs-abi';
import * as utils from 'ethereumjs-util';
import * as _ from 'lodash';
import * as GethApiDouble from 'ganache-core/lib/subproviders/geth_api_double';
import * as accounts from '../../accounts';
import signNonce from '../../../src/package/sign-nonce';
import * as schemas from '../../../src/package/schemas';
import * as web3Provisioned from '../../../src/package/web3-provisioned';

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

  it('should validate schema', async () => {
    const nonce = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
    const payload = await signNonce(accounts.user.address, nonce);
    const validator = new jsonschema.Validator();
    const result = validator.validate(payload, schemas.simpleSignatureSchema);
    expect(result.errors).toHaveLength(0);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
