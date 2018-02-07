import merge from 'lodash/merge';
import * as types from '../actions/action-types';

export const initialState = {
  score: 0,
  board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  gameover: true,
  signature: {
    message: '0x0', messageHash: '0x0', v: 0, r: '0x0', s: '0x0', signature: '0x0',
  },
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.GET_GAME_STATE_FULFILLED:
    case types.MOVE_FULFILLED:
      return merge({}, state, action.payload);
    default:
      return state;
  }
};
