import jsonschema from 'jsonschema';
import * as schemas from '../../schemas';

describe('iouValueSchema', () => {
  it('should validate', async () => {
    const value = 17;
    const instance = { value };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.iouValueSchema);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail to validate string', async () => {
    const value = '';
    const instance = { value };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.iouValueSchema);
    expect(result.errors).toHaveLength(1);
  });

  it('should fail to validate wrong key', async () => {
    const otherValue = 17;
    const instance = { otherValue };
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.iouValueSchema);
    expect(result.errors).toHaveLength(1);
  });
});

describe('simpleSignatureSchema', () => {
  it('should validate', async () => {
    const instance = '0x';
    const validator = new jsonschema.Validator();
    const result = validator.validate(instance, schemas.simpleSignatureSchema);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail to validate a number', async () => {
    const instance = 0;
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

describe('moveSchema', () => {
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
    const result = validator.validate(instance, schemas.moveSchema);
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
      const result = validator.validate(instance, schemas.moveSchema);
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
      const result = validator.validate(instance, schemas.moveSchema);
      expect(result.errors).toHaveLength(1);
    });
  });
});

describe('IOUSchema', () => {
  it('should validate', async () => {
    const instance = {
      user: '0x',
      value: 0,
      signature: '0x',
    };
    const validator = new jsonschema.Validator();
    validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
    const result = validator.validate(instance, schemas.IOUSchema);
    expect(result.errors).toHaveLength(0);
  });

  [
    ['user', 0],
    ['value', ''],
    ['signature', 0],
  ].forEach(([key, value]) => {
    it(`should fail to validate with wrong datatype: ${key}`, async () => {
      const instance = {
        user: '0x',
        value: 0,
        signature: '0x',
      };
      instance[key] = value;
      const validator = new jsonschema.Validator();
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      const result = validator.validate(instance, schemas.IOUSchema);
      expect(result.errors).toHaveLength(1);
    });
  });

  [
    ['user'],
    ['value'],
    ['signature'],
  ].forEach(([key]) => {
    it(`should fail to validate with missing data: ${key}`, async () => {
      const instance = {
        user: '0x',
        value: 0,
        signature: '0x',
      };
      delete instance[key];
      const validator = new jsonschema.Validator();
      validator.addSchema(schemas.simpleSignatureSchema, '/simpleSignatureSchema');
      const result = validator.validate(instance, schemas.IOUSchema);
      expect(result.errors).toHaveLength(1);
    });
  });
});
