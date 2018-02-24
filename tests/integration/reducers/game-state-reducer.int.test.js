import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';
import * as api from '../../../src/package/api';
import * as accounts from '../../accounts';
import sendIOU from '../sendIOU';

describe('live data from webserver', () => {
  beforeAll(async () => {
    await sendIOU();
  });

  it('should affect the board state', async () => {
    const direction = 1;
    const data = await api.move(accounts.user.address, direction);
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: data,
    };
    const state = reducer({}, fulfilledAction);
    expect(state).toHaveProperty('score');
    expect(state).toHaveProperty('board');
    expect(state).toHaveProperty('gameover');
    expect(state).toHaveProperty('signature');

    const {
      score, board, gameover, signature,
    } = state;

    expect(typeof score).toBe('number');
    expect(typeof gameover).toBe('boolean');

    // Should be a new game
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
