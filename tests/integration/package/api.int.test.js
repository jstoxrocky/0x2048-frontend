import * as api from '../../../src/package/base-api';
import * as accounts from '../../accounts';
import sendIOU from '../sendIOU';

it('/gamestate', async () => {
  const data = await api.gameState();
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
  expect(typeof r).toBe('string');
  expect(typeof s).toBe('string');
  expect(typeof subSignature).toBe('string');
});


describe('/iou and /move', () => {
  beforeAll(async () => {
    await sendIOU();
  });

  it('/move', async () => {
    // Move
    const direction = 1;
    const data = await api.move(accounts.user.address, direction);

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
    expect(typeof r).toBe('string');
    expect(typeof s).toBe('string');
    expect(typeof subSignature).toBe('string');
  });
});
