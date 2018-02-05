import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';
import * as api from '../../../src/package/api';
import { user } from '../../unit/package/test-setup/test-provider';

describe('game-state reducer', () => {
  it('should handle MOVE_FULFILLED', async () => {
    const direction = 1;
    const data = await api.move(user.address, direction);
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
});

