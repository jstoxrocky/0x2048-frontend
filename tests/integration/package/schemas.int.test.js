import jsonschema from 'jsonschema';
import * as schemas from '../../schemas';
import nonceJson from '../../../integration-tests-json/schemas/nonce.json';
import signedGamestateJson from '../../../integration-tests-json/schemas/signed-gamestate.json';
import iouJson from '../../../integration-tests-json/schemas/iou.json';
import moveJson from '../../../integration-tests-json/schemas/move.json';
import userJson from '../../../integration-tests-json/schemas/user.json';

describe('user schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    const result = validator.validate(userJson, schemas.userSchema);
    expect(result.errors).toHaveLength(0);
  });
});

describe('signed-gamestate schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    validator.addSchema(schemas.fullSignatureSchema, '/fullSignatureSchema');
    validator.addSchema(schemas.gamestateSchema, '/gamestateSchema');
    const result = validator.validate(signedGamestateJson, schemas.signedGamestateSchema);
    expect(result.errors).toHaveLength(0);
  });
});

describe('move schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    const result = validator.validate(moveJson, schemas.moveSchema);
    expect(result.errors).toHaveLength(0);
  });
});

describe('iou schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    const result = validator.validate(iouJson, schemas.IOUSchema);
    expect(result.errors).toHaveLength(0);
  });
});

describe('nonce schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    const result = validator.validate(nonceJson, schemas.nonceSchema);
    expect(result.errors).toHaveLength(0);
  });
});
