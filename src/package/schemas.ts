// api.nonce
export const nonce = {
  id: '/nonce',
  type: 'object',
  properties: {
    nonce: { type: 'string'},
  },
  required: ['nonce'],
  additionalProperties: false,
};

// api.move input
export const move = {
  id: '/move',
  type: 'object',
  properties: {
    direction: { type: 'number' },
  },
  required: ['direction'],
  additionalProperties: false,
};

// api.paymentConfirmation input
export const receipt = {
  id: '/receipt',
  type: 'object',
  properties: {
    txhash: { type: 'string' },
    signature: { type: 'string' },
  },
  required: ['txhash', 'signature'],
  additionalProperties: false,
};

export const fullSignature = {
  id: '/fullSignature',
  type: 'object',
  properties: {
    message: { type: 'string' },
    messageHash: { type: 'string' },
    v: { type: 'number' },
    r: { type: 'string' },
    s: { type: 'string' },
    signature: { type: 'string' },
  },
  required: ['message', 'messageHash', 'v', 'r', 's', 'signature'],
  additionalProperties: false,
};

// api.move, api.paymentConfirmation output
export const signedGamestate = {
  id: '/signedGamestate',
  properties: {
    score: { type: 'number' },
    gameover: { type: 'boolean' },
    board: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'number',
        },
        minItems: 4,
        maxItems: 4,
      },
      minItems: 4,
      maxItems: 4,
    },
    signature: { $ref: '/fullSignature' },
    recoveredAddress: { type: 'string' },
  },
  required: ['score', 'gameover', 'board', 'signature', 'recoveredAddress'],
  additionalProperties: false,
};
