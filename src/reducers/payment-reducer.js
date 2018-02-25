import merge from 'lodash/merge';
import * as types from '../actions/action-types';

export const initialState = {
  value: 0,
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.GET_IOU_FULFILLED:
      return merge({}, state, {
        value: action.payload.value,
      });
    default:
      return state;
  }
};
