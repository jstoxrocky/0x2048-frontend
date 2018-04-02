import jsonschema from 'jsonschema';
import * as schemas from '../../../src/package/schemas';

describe('schemas', async () => {
  describe('nonce', () => {
    it('should validate', async () => {
      const nonce = '0x123456';
      const instance = { nonce };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.nonce);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail to validate string', async () => {
      const nonce = 17;
      const instance = { nonce };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.nonce);
      expect(result.errors).toHaveLength(1);
    });

    it('should fail to validate wrong key', async () => {
      const value = '0x123456';
      const instance = { value };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.nonce);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('move', () => {
    it('should validate', async () => {
      const instance = {
        user: '0x0',
        direction: 1,
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.move);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['user', 0],
      ['direction', ''],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          user: '0x0',
          direction: 1,
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.move);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['user'],
      ['direction'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          user: '0x0',
          direction: 1,
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.move);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('signedScore', () => {
    it('should validate', async () => {
      const instance = {
        v: '0x00',
        r: '0x00',
        s: '0x00',
        score: 1,
        user: '0x00',
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.signedScore);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['v', 0],
      ['r', 0],
      ['s', 0],
      ['score', ''],
      ['user', 0],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          v: '0x00',
          r: '0x00',
          s: '0x00',
          score: 1,
          user: '0x00',
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.signedScore);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['v'],
      ['r'],
      ['s'],
      ['score'],
      ['user'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          v: '0x00',
          r: '0x00',
          s: '0x00',
          score: 1,
          user: '0x00',
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.signedScore);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('receipt', () => {
    it('should validate', async () => {
      const instance = {
        txhash: '0x00',
        signature: '0x00',
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.receipt);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['txhash', 0],
      ['signature', 0],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          txhash: '0x00',
          signature: '0x00',
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.receipt);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['txhash'],
      ['signature'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          txhash: '0x00',
          signature: '0x00',
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.receipt);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('transactionReceipt', () => {
    it('should validate', async () => {
      const instance = {
        transactionHash: '0x00',
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.transactionReceipt);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['transactionHash', 0],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          transactionHash: '0x00',
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.transactionReceipt);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['transactionHash'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          transactionHash: '0x00',
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.transactionReceipt);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('arcadeState', () => {
    it('should validate', async () => {
      const instance = {
        jackpot: 0,
        round: 0,
        highscore: 0,
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.arcadeState);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['jackpot', '0x00'],
      ['round', '0x00'],
      ['highscore', '0x00'],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          jackpot: 0,
          round: 0,
          highscore: 0,
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.arcadeState);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['jackpot'],
      ['round'],
      ['highscore'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          jackpot: 0,
          round: 0,
          highscore: 0,
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.arcadeState);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('fullSignatureSchema', () => {
    it('should validate', async () => {
      const instance = {
        message: '0x',
        messageHash: '0x',
        v: 0,
        r: '0x',
        s: '0x',
        signature: '0x',
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(instance, schemas.fullSignature);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['message', 0],
      ['messageHash', 0],
      ['v', ''],
      ['r', 0],
      ['s', 0],
      ['signature', 0],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          message: '0x',
          messageHash: '0x',
          v: 0,
          r: '0x',
          s: '0x',
          signature: '0x',
        };
        instance[key] = value;
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.fullSignature);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['message'],
      ['messageHash'],
      ['v'],
      ['r'],
      ['s'],
      ['signature'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          message: '0x',
          messageHash: '0x',
          v: 0,
          r: '0x',
          s: '0x',
          signature: '0x',
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        const result = validator.validate(instance, schemas.fullSignature);
        expect(result.errors).toHaveLength(1);
      });
    });
  });

  describe('signedGamestateSchema', () => {
    it('should validate', async () => {
      const instance = {
        score: 0,
        board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        gameover: false,
        signature: {
          message: '0x',
          messageHash: '0x',
          v: 0,
          r: '0x',
          s: '0x',
          signature: '0x',
        },
      };
      const validator = new jsonschema.Validator();
      validator.addSchema(schemas.fullSignature, '/fullSignature');
      const result = validator.validate(instance, schemas.signedGamestate);
      expect(result.errors).toHaveLength(0);
    });

    [
      ['score', ''],
      ['board', 0],
      ['gameover', 0],
      ['signature', 0],
    ].forEach(([key, value]) => {
      it(`should fail to validate with wrong datatype: ${key}`, async () => {
        const instance = {
          score: 0,
          board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
          gameover: false,
          signature: {
            message: '0x',
            messageHash: '0x',
            v: 0,
            r: '0x',
            s: '0x',
            signature: '0x',
          },
        };

        instance[key] = value;
        const validator = new jsonschema.Validator();
        validator.addSchema(schemas.fullSignature, '/fullSignature');
        const result = validator.validate(instance, schemas.signedGamestate);
        expect(result.errors).toHaveLength(1);
      });
    });

    [
      ['score'],
      ['board'],
      ['gameover'],
      ['signature'],
    ].forEach(([key]) => {
      it(`should fail to validate with missing data: ${key}`, async () => {
        const instance = {
          score: 0,
          board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
          gameover: false,
          signature: {
            message: '0x',
            messageHash: '0x',
            v: 0,
            r: '0x',
            s: '0x',
            signature: '0x',
          },
        };
        delete instance[key];
        const validator = new jsonschema.Validator();
        validator.addSchema(schemas.fullSignature, '/fullSignature');
        const result = validator.validate(instance, schemas.signedGamestate);
        expect(result.errors).toHaveLength(1);
      });
    });
  });
});
