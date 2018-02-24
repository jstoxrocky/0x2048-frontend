import merge from 'lodash/merge';
import * as messages from '../package/messages';
import * as types from '../actions/action-types';

export const initialState = {
  value: '',
  visible: false,
  level: '',
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.GET_GAME_STATE_PENDING:
    case types.GET_ARCADE_STATE_PENDING:
    case types.UPLOAD_PENDING: {
      return merge({}, state, messages.Loading);
    }
    case types.GET_GAME_STATE_FULFILLED:
    case types.MOVE_FULFILLED:
    case types.GET_ARCADE_STATE_FULFILLED: {
      return merge({}, state, initialState);
    }
    case types.UPLOAD_FULFILLED: {
      return merge({}, state, messages.UploadScoreSuccess);
    }
    case types.GET_GAME_STATE_REJECTED: {
      const newState = merge({}, state, messages.GetGameStateRejected);
      newState.value = [newState.value, action.payload.message].join(' ');
      return newState;
    }
    case types.MOVE_REJECTED: {
      const newState = merge({}, state, messages.MoveRejected);
      newState.value = [newState.value, action.payload.message].join(' ');
      return newState;
    }
    case types.GET_ARCADE_STATE_REJECTED: {
      const newState = merge({}, state, messages.GetArcadeStateRejected);
      newState.value = [newState.value, action.payload.message].join(' ');
      return newState;
    }
    case types.UPLOAD_REJECTED: {
      const newState = merge({}, state, messages.UploadRejected);
      newState.value = [newState.value, action.payload.message].join(' ');
      return newState;
    }
    case types.HIDE_MESSAGE: {
      const newState = merge({}, initialState, { visible: false });
      return newState;
    }
    default:
      return state;
  }
};
