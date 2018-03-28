import jsonschema from 'jsonschema';
import * as schemas from '../../../src/package/schemas';

describe('nonceSchema', () => {
  it('should validate', async () => {
    const nonce = '0x123456';
    const instance = { nonce };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.nonceSchema);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail to validate string', async () => {
    const nonce = 17;
    const instance = { nonce };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.nonceSchema);
    expect(result.errors).toHaveLength(1);
  });

  it('should fail to validate wrong key', async () => {
    const value = '0x123456';
    const instance = { value };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.nonceSchema);
    expect(result.errors).toHaveLength(1);
  });
});

describe('simpleSignatureSchema', () => {
  it('should validate', async () => {
    const signature = '0x';
    const instance = { signature };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.simpleSignatureSchema);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail to validate a number', async () => {
    const signature = 0;
    const instance = { signature };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.simpleSignatureSchema);
    expect(result.errors).toHaveLength(1);
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
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    const result = validator.validate(instance, schemas.fullSignatureSchema);
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
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      const result = validator.validate(instance, schemas.fullSignatureSchema);
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
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      const result = validator.validate(instance, schemas.fullSignatureSchema);
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
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    validator.addSchema(schemas.fullSignatureSchema, '/fullSignatureSchema');
    validator.addSchema(schemas.gamestateSchema, '/gamestateSchema');
    const result = validator.validate(instance, schemas.signedGamestateSchema);
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
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      validator.addSchema(schemas.fullSignatureSchema, '/fullSignatureSchema');
      validator.addSchema(schemas.gamestateSchema, '/gamestateSchema');
      const result = validator.validate(instance, schemas.signedGamestateSchema);
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
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      validator.addSchema(schemas.fullSignatureSchema, '/fullSignatureSchema');
      validator.addSchema(schemas.gamestateSchema, '/gamestateSchema');
      const result = validator.validate(instance, schemas.signedGamestateSchema);
      expect(result.errors).toHaveLength(1);
    });
  });
});

describe('moveSchema', () => {
  it('should validate', async () => {
    const instance = {
      user: '0x0',
      direction: 1,
    };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.moveSchema);
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
      const result = validator.validate(instance, schemas.moveSchema);
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
      const result = validator.validate(instance, schemas.moveSchema);
      expect(result.errors).toHaveLength(1);
    });
  });
});
