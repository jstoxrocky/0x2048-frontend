import jsonschema from 'jsonschema';
import * as schemas from '../../../src/package/schemas';
import nonceJson from '../../../integration-json-fixtures/schemas/nonce.json';
import signedGamestateJson from '../../../integration-json-fixtures/schemas/signed-gamestate.json';
import moveJson from '../../../integration-json-fixtures/schemas/move.json';
import receiptJson from '../../../integration-json-fixtures/schemas/receipt.json';

describe('schemas shared with websever', async () => {
  describe('signed-gamestate', () => {
    it('should validate json-fixture', () => {
      const validator = new jsonschema.Validator();
      validator.addSchema(schemas.fullSignature, '/fullSignature');
      const result = validator.validate(signedGamestateJson, schemas.signedGamestate);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('move', () => {
    it('should validate json-fixture', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(moveJson, schemas.move);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('nonce', () => {
    it('should validate json-fixture', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(nonceJson, schemas.nonce);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('receipt', () => {
    it('should validate json-fixture', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(receiptJson, schemas.receipt);
      expect(result.errors).toHaveLength(0);
    });
  });
});