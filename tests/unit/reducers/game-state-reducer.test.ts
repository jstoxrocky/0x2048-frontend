import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';

const initialState = {
  score: 0,
  signature: {
    messageHash: '0x00',
    message: '0x00',
    v: 0,
    r: '0x00',
    s: '0x00',
    signature: '0x00',
  },
  board: [[0]],
  gameover: true,
  recoveredAddress: '0x00',
};

const mockGameState = {
  score: 1,
  signature: {
    messageHash: '0x01',
    message: '0x01',
    v: 1,
    r: '0x01',
    s: '0x01',
    signature: '0x01',
  },
  board: [[1]],
  gameover: true,
  recoveredAddress: '0x01',
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
    expect(reducer(initialState, fulfilledAction)).toEqual(mockGameState);
  });
  it('should handle GET_NEW_GAME_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_NEW_GAME_FULFILLED,
      payload: { gameState: mockGameState },
    };
    expect(reducer(initialState, fulfilledAction)).toEqual(mockGameState);
  });
  it('should handle GET_GAME_STATE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_GAME_STATE_FULFILLED,
      payload: mockGameState,
    };
    expect(reducer(initialState, fulfilledAction)).toEqual(mockGameState);
  });
});
