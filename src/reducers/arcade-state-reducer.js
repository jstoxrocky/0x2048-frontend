import merge from 'lodash/merge';
import * as types from '../actions/action-types';

export const initialState = {
  jackpot: 0,
  price: 0,
  round: 0,
  isParticipant: false,
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.PAY_FULFILLED:
      return merge({}, state, {
        jackpot: action.payload.jackpot,
        isParticipant: action.payload.isParticipant,
      });
    case types.UPLOAD_FULFILLED:
      return merge({}, state, {
        jackpot: action.payload.jackpot,
        isParticipant: action.payload.isParticipant,
        round: action.payload.round,
      });
    case types.ADJUST_PRICE_FULFILLED:
      return merge({}, state, {
        price: action.payload.price,
      });
    case types.GET_ARCADE_STATE_FULFILLED:
      return merge({}, state, {
        jackpot: action.payload.jackpot,
        price: action.payload.price,
        round: action.payload.round,
        isParticipant: action.payload.isParticipant,
      });
    default:
      return state;
  }
};
