// api.nonce
export const nonce = {
  id: '/nonce',
  type: 'object',
  properties: {
    nonce: { type: 'string', required: true },
  },
  additionalProperties: false,
};

// api.move input
export const move = {
  id: '/move',
  type: 'object',
  properties: {
    direction: { type: 'number', required: true },
  },
  additionalProperties: false,
};

// arcadeContract.uploadScore input
export const signedScore = {
  id: '/signedScore',
  type: 'object',
  properties: {
    v: { type: 'string', required: true },
    r: { type: 'string', required: true },
    s: { type: 'string', required: true },
    score: { type: 'number', required: true },
    recoveredAddress: { type: 'string', required: true },
  },
  required: true,
  additionalProperties: false,
};

// api.paymentConfirmation input
export const receipt = {
  id: '/receipt',
  type: 'object',
  properties: {
    txhash: { type: 'string', required: true },
    signature: { type: 'string', required: true },
  },
  required: true,
  additionalProperties: false,
};

// arcadeContract.pay output
export const transactionReceipt = {
  id: '/transactionReceipt',
  type: 'object',
  properties: {
    transactionHash: { type: 'string', required: true },
  },
  required: true,
  additionalProperties: true,
};

// arcadeContract.uploadScore output
export const arcadeState = {
  id: '/arcadeState',
  type: 'object',
  properties: {
    jackpot: { type: 'number', required: true },
    round: { type: 'number', required: true },
    highscore: { type: 'number', required: true },
  },
  required: true,
  additionalProperties: false,
};

export const fullSignature = {
  id: '/fullSignature',
  type: 'object',
  properties: {
    message: { type: 'string', required: true },
    messageHash: { type: 'string', required: true },
    v: { type: 'number', required: true },
    r: { type: 'string', required: true },
    s: { type: 'string', required: true },
    signature: { type: 'string', required: true },
  },
  required: true,
  additionalProperties: false,
};

// api.move, api.paymentConfirmation output
export const signedGamestate = {
  id: '/signedGamestate',
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
    signature: { $ref: '/fullSignature' },
    recoveredAddress: { type: 'string', required: true },
  },
  additionalProperties: false,
};
