export const iouValueSchema = {
  id: '/iouValueSchema',
  type: 'object',
  properties: {
    value: { type: 'number', required: true },
  },
};

export const signatureSchema = {
  id: '/signatureSchema',
  type: 'object',
  properties: {
    message: { type: 'string', required: true },
    messageHash: { type: 'string', required: true },
    v: { type: 'number', required: true },
    r: { type: 'string', required: true },
    s: { type: 'string', required: true },
    signature: { type: 'string', required: true },
  },
};

export const moveSchema = {
  id: '/moveSchema',
  type: 'object',
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
    signature: { $ref: '/signatureSchema' },
  },
};
