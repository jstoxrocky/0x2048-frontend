import jsonschema from 'jsonschema';
import * as schemas from '../../../src/package/schemas';
import nonceJson from '../../../integration-json-fixtures/schemas/nonce.json';
import signedGamestateJson from '../../../integration-json-fixtures/schemas/signed-gamestate.json';
import moveJson from '../../../integration-json-fixtures/schemas/move.json';

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

describe('nonce schema', () => {
  it('should validate', () => {
    const validator = new jsonschema.Validator();
    const result = validator.validate(nonceJson, schemas.nonceSchema);
    expect(result.errors).toHaveLength(0);
  });
});
