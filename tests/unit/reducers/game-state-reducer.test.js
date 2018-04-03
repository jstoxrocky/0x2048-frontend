import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';

const initialState = {
  score: 0,
  signature: null,
  board: null,
  gameover: true,
};

const mockGameState = {
  score: 1,
  signature: '0x1234',
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
      payload: mockGameState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockGameState);
  });
  it('should handle GET_NEW_GAME_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_NEW_GAME_FULFILLED,
      payload: { gameState: mockGameState },
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockGameState);
  });
  it('should handle GET_GAME_STATE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_GAME_STATE_FULFILLED,
      payload: mockGameState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockGameState);
  });
});
