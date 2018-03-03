import sinon from 'sinon';
import jsonschema from 'jsonschema';
import * as accounts from '../../accounts';
import * as signing from '../../../src/package/signTypedData';
import iou from '../../../src/package/iou';
import * as schemas from '../../schemas';

describe('iou', () => {
  beforeEach(() => {
    sinon.stub(signing, 'default');
  });

  afterEach(() => {
    signing.default.restore();
  });

  it('should validate schema', async () => {
    const signature = '0xd3cacf1d6fef0b84a21253526daed7c578b67361eaf52acb5b82c8ddc071bc140aa92fe3aa2e2053c2b035e528d82a464c67ef26c12b6f7d78b197bd29bc4c551b';
    signing.default.returns(Promise.resolve(signature));
    const value = 17;
    const payload = await iou(accounts.user.address, value);
    const validator = new jsonschema.Validator();
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    const result = validator.validate(payload, schemas.IOUSchema);
    expect(result.errors).toHaveLength(0);
  });
});
