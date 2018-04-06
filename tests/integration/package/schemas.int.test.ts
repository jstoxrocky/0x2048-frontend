import jsonschema from 'jsonschema';
import * as schemas from '../../../src/package/schemas';
import * as interfaces from '../../../src/package/interfaces';
import nonceJson from '../../../integration-json-fixtures/schemas/nonce.json';
import signedGamestateJson from '../../../integration-json-fixtures/schemas/signed-gamestate.json';
import moveJson from '../../../integration-json-fixtures/schemas/move.json';
import receiptJson from '../../../integration-json-fixtures/schemas/receipt.json';

describe('schemas shared with websever', async () => {
  describe('signedGameState json-fixture', () => {
    it('should equal compileTime version', () => {
      const compileTimeSignedGameState: interfaces.SignedGameState = {
        board: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        gameover: true,
        score: 0,
        signature: {
          message: '0x0',
          messageHash: '0x0',
          v: 0,
          r: '0x0',
          s: '0x0',
          signature: '0x0',
        },
        recoveredAddress: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
      };
      expect(compileTimeSignedGameState).toEqual(signedGamestateJson);
    });

    it('should validate schemas.signedGamestate', () => {
      const validator = new jsonschema.Validator();
      validator.addSchema(schemas.fullSignature, '/fullSignature');
      const result = validator.validate(signedGamestateJson, schemas.signedGamestate);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('move json-fixture', () => {
    it('should equal compileTime version', () => {
      const compileTimeMove: interfaces.Move = {
        direction: 1,
      };
      expect(compileTimeMove).toEqual(moveJson);
    });

    it('should validate schemas.move', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(moveJson, schemas.move);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('challenge json-fixture', () => {
    it('should equal compileTime version', () => {
      const compileTimeChallenge: interfaces.Challenge = {
        nonce: '0x123456',
      };
      expect(compileTimeChallenge).toEqual(nonceJson);
    });

    it('should validate schemas.challenge', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(nonceJson, schemas.nonce);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('receipt json-fixture', () => {
    it('should equal compileTime version', () => {
      const compileTimeChallenge: interfaces.Receipt = {
        signature: '0x0',
        txhash: '0x0',
      };
      expect(compileTimeChallenge).toEqual(receiptJson);
    });

    it('should validate schemas.receipt', () => {
      const validator = new jsonschema.Validator();
      const result = validator.validate(receiptJson, schemas.receipt);
      expect(result.errors).toHaveLength(0);
    });
  });
});
