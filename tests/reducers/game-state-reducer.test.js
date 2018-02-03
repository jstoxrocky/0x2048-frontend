import reducer from '../../src/reducers/game-state-reducer';
import * as types from '../../src/actions/action-types';

const initialState = {
  score: 0,
  user: null,
  board: null,
  gameover: true,
};

const mockScoreState = {
  score: 1,
  user: '0x1234',
  board: [],
  gameover: false,
};

describe('score reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should handle MOVE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: mockScoreState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockScoreState);
  });
});
