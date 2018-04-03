import reducer from '../../../src/reducers/arcade-state-reducer';
import * as types from '../../../src/actions/action-types';

const initialState = {
  jackpot: 0,
  highscore: 0,
  round: 0,
};

const mockArcadeState = {
  jackpot: 1,
  highscore: 1,
  round: 1,
};

const mockUploadState = {
  jackpot: 3,
  highscore: 3,
  round: 3,
};

describe('arcade-state reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should handle GET_ARCADE_STATE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_ARCADE_STATE_FULFILLED,
      payload: mockArcadeState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockArcadeState);
  });

  it('should handle UPLOAD_FULFILLED', () => {
    const fulfilledAction = {
      type: types.UPLOAD_FULFILLED,
      payload: mockUploadState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockUploadState);
  });
  it('should handle GET_NEW_GAME_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_NEW_GAME_FULFILLED,
      payload: { arcadeState: mockArcadeState },
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockArcadeState);
  });
});
