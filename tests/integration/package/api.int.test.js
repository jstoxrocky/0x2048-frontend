import { user } from '../../unit/package/test-setup/test-provider';
import * as api from '../../../src/package/base-api';

it('/gamestate', async () => {
  const data = await api.gameState(user.address);

  expect(data).toHaveProperty('score');
  expect(data).toHaveProperty('board');
  expect(data).toHaveProperty('gameover');
  expect(data).toHaveProperty('signature');
  const {
    score, board, gameover, signature,
  } = data;

  expect(typeof score).toBe('number');
  expect(typeof gameover).toBe('boolean');

  expect(score).toBe(0);
  expect(board.length).toBe(4);
  expect(board[0].length).toBe(4);
  expect(gameover).toBe(true);

  expect(signature).toHaveProperty('message');
  expect(signature).toHaveProperty('messageHash');
  expect(signature).toHaveProperty('v');
  expect(signature).toHaveProperty('r');
  expect(signature).toHaveProperty('s');
  expect(signature).toHaveProperty('signature');
  const {
    message, messageHash, v, r, s,
  } = signature;
  const subSignature = signature.signature;

  expect(typeof message).toBe('string');
  expect(typeof messageHash).toBe('string');
  expect(typeof v).toBe('number');
  expect(typeof r).toBe('number');
  expect(typeof s).toBe('number');
  expect(typeof subSignature).toBe('string');
});

it('/move', async () => {
  const direction = 1;
  const data = await api.move(user.address, direction);

  expect(data).toHaveProperty('score');
  expect(data).toHaveProperty('board');
  expect(data).toHaveProperty('gameover');
  expect(data).toHaveProperty('signature');
  const {
    score, board, gameover, signature,
  } = data;

  expect(typeof score).toBe('number');
  expect(typeof gameover).toBe('boolean');

  expect(score).toBe(0);
  expect(board.length).toBe(4);
  expect(board[0].length).toBe(4);
  expect(gameover).toBe(false);

  expect(signature).toHaveProperty('message');
  expect(signature).toHaveProperty('messageHash');
  expect(signature).toHaveProperty('v');
  expect(signature).toHaveProperty('r');
  expect(signature).toHaveProperty('s');
  expect(signature).toHaveProperty('signature');
  const {
    message, messageHash, v, r, s,
  } = signature;
  const subSignature = signature.signature;

  expect(typeof message).toBe('string');
  expect(typeof messageHash).toBe('string');
  expect(typeof v).toBe('number');
  expect(typeof r).toBe('number');
  expect(typeof s).toBe('number');
  expect(typeof subSignature).toBe('string');
});

it('/price', async () => {
  const data = await api.price(user.address);
  const { price, signature } = data;

  expect(data).toHaveProperty('price');
  expect(data).toHaveProperty('signature');

  expect(typeof price).toBe('number');

  expect(signature).toHaveProperty('message');
  expect(signature).toHaveProperty('messageHash');
  expect(signature).toHaveProperty('v');
  expect(signature).toHaveProperty('r');
  expect(signature).toHaveProperty('s');
  expect(signature).toHaveProperty('signature');
  const {
    message, messageHash, v, r, s,
  } = signature;
  const subSignature = signature.signature;

  expect(typeof message).toBe('string');
  expect(typeof messageHash).toBe('string');
  expect(typeof v).toBe('number');
  expect(typeof r).toBe('number');
  expect(typeof s).toBe('number');
  expect(typeof subSignature).toBe('string');
});
