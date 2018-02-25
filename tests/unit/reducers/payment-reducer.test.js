import reducer from '../../../src/reducers/payment-reducer';
import * as types from '../../../src/actions/action-types';

const initialState = {
  value: 0,
};

const mockPaymentState = {
  value: 1,
};

describe('payment reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should handle GET_IOU_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_IOU_FULFILLED,
      payload: mockPaymentState,
    };
    expect(reducer({}, fulfilledAction)).toEqual(mockPaymentState);
  });
});
