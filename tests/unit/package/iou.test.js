import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import jsonschema from 'jsonschema';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import createIOU from '../../../src/package/iou';
import * as schemas from '../../schemas';

describe('iou object', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should validate', async () => {
    const value = 20;
    const payload = await createIOU(accounts.user.address, value);
    const validator = new jsonschema.Validator();
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    const result = validator.validate(payload, schemas.IOUSchema);
    expect(result.errors).toHaveLength(0);
  });
});
