import merge from 'lodash/merge';
import * as types from '../actions/action-types';

export const initialState = {
  jackpot: 0,
  highscore: 0,
  round: 0,
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.GET_ARCADE_STATE_FULFILLED:
    case types.UPLOAD_FULFILLED:
      return merge({}, state, {
        jackpot: action.payload.jackpot,
        highscore: action.payload.highscore,
        round: action.payload.round,
      });
    default:
      return state;
  }
};
