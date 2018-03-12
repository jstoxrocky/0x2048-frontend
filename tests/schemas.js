export const nonceSchema = {
  id: '/nonceSchema',
  type: 'object',
  properties: {
    nonce: { type: 'number', required: true },
  },
};

export const userSchema = {
  id: '/userSchema',
  type: 'object',
  properties: {
    user: { type: 'string', required: true },
  },
};

export const moveSchema = {
  id: '/moveSchema',
  type: 'object',
  properties: {
    user: { type: 'string', required: true },
    direction: { type: 'number', required: true },
  },
};

export const simpleSignatureSchema = {
  id: '/simpleSignatureSchema',
  type: 'string',
  required: true,
};

export const fullSignatureSchema = {
  id: '/fullSignatureSchema',
  type: 'object',
  properties: {
    message: { type: 'string', required: true },
    messageHash: { type: 'string', required: true },
    v: { type: 'number', required: true },
    r: { type: 'string', required: true },
    s: { type: 'string', required: true },
    signature: { $ref: '/simpleSignatureSchema' },
  },
  required: true,
};

export const IOUSchema = {
  id: '/IOUSchema',
  type: 'object',
  properties: {
    user: { type: 'string', required: true },
    nonce: { type: 'number', required: true },
    signature: { $ref: '/simpleSignatureSchema' },
  },
};

export const signedGamestateSchema = {
  id: '/signedGamestateSchema',
  properties: {
    score: { type: 'number', required: true },
    gameover: { type: 'boolean', required: true },
    board: {
      type: 'array',
      required: true,
      items: {
        type: 'array',
        required: true,
        items: {
          type: 'number',
          required: true,
        },
        minItems: 4,
        maxItems: 4,
      },
      minItems: 4,
      maxItems: 4,
    },
    signature: { $ref: '/fullSignatureSchema' },
  },
};
