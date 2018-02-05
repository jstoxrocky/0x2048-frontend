import reducer from '../../../src/reducers/arcade-state-reducer';
import * as types from '../../../src/actions/action-types';

const initialState = {
  jackpot: 0,
  price: 0,
  round: 0,
  isParticipant: false,
};

const mockArcadeState = {
  jackpot: 1,
  price: 1,
  round: 1,
  isParticipant: true,
};

const mockPayState = {
  jackpot: 2,
  isParticipant: true,
};

const mockUploadState = {
  jackpot: 3,
  round: 3,
  isParticipant: true,
};

const mockPriceState = {
  price: 4,
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
  it('should handle PAY_FULFILLED', () => {
    const fulfilledAction = {
      type: types.PAY_FULFILLED,
      payload: mockPayState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockPayState);
  });
  it('should handle UPLOAD_FULFILLED', () => {
    const fulfilledAction = {
      type: types.UPLOAD_FULFILLED,
      payload: mockUploadState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockUploadState);
  });
  it('should handle ADJUST_PRICE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.ADJUST_PRICE_FULFILLED,
      payload: mockPriceState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockPriceState);
  });
});
