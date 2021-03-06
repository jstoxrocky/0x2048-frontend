import { merge } from 'lodash';
import * as types from '../actions/action-types';
import * as messages from '../package/messages';

export const initialState = {
  level: '',
  value: '',
  visible: false,
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case types.GET_NEW_GAME_PENDING:
    case types.GET_GAME_STATE_PENDING:
    case types.GET_ARCADE_STATE_PENDING:
    case types.UPLOAD_PENDING: {
      return merge({}, state, messages.Loading);
    }
    case types.GET_NEW_GAME_FULFILLED:
    case types.GET_GAME_STATE_FULFILLED:
    case types.GET_ARCADE_STATE_FULFILLED: {
      return merge({}, state, initialState);
    }
    case types.MOVE_FULFILLED: {
      const msg = action.payload.gameover ? messages.GameOver : initialState;
      const newState = merge({}, state, msg);
      return newState;
    }
    case types.UPLOAD_FULFILLED: {
      return merge({}, state, messages.UploadScoreSuccess);
    }
    case types.GET_NEW_GAME_REJECTED: {
      const newState = merge({}, state, messages.GetNewGameRejected);
      newState.value = [newState.value, action.payload.message].join(' ');
      return newState;
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
