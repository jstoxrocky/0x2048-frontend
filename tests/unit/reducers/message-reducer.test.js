import merge from 'lodash/merge';
import reducer from '../../../src/reducers/message-reducer';
import * as types from '../../../src/actions/action-types';
import * as messages from '../../../src/package/messages';

const initialState = {
  value: '',
  visible: false,
  level: '',
};
const payloadError = Error('Error');

describe('message reducer initial state', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
});

describe('message reducer pending actions', () => {
  it('should handle GET_ARCADE_STATE_PENDING', () => {
    const pendingAction = {
      type: types.GET_ARCADE_STATE_PENDING,
    };
    expect(reducer({}, pendingAction)).toEqual(messages.Loading);
  });

  it('should handle UPLOAD_PENDING', () => {
    const pendingAction = {
      type: types.UPLOAD_PENDING,
    };
    expect(reducer({}, pendingAction)).toEqual(messages.Loading);
  });

  it('should handle GET_GAME_STATE_PENDING', () => {
    const pendingAction = {
      type: types.GET_GAME_STATE_PENDING,
    };
    expect(reducer({}, pendingAction)).toEqual(messages.Loading);
  });

  it('should handle GET_NEW_GAME_PENDING', () => {
    const pendingAction = {
      type: types.GET_NEW_GAME_PENDING,
    };
    expect(reducer({}, pendingAction)).toEqual(messages.Loading);
  });

  it('should handle MOVE_PENDING', () => {
    const pendingAction = {
      type: types.MOVE_PENDING,
    };
    expect(reducer({}, pendingAction)).toEqual({});
  });
});

describe('message reducer fulfilled actions', () => {
  it('should handle GET_ARCADE_STATE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_ARCADE_STATE_FULFILLED,
      payload: messages.TransactionSuccess,
    };
    expect(reducer({}, fulfilledAction)).toEqual(initialState);
  });

  it('should handle UPLOAD_FULFILLED', () => {
    const fulfilledAction = {
      type: types.UPLOAD_FULFILLED,
      payload: messages.TransactionSuccess,
    };
    expect(reducer({}, fulfilledAction)).toEqual(messages.UploadScoreSuccess);
  });

  it('should handle GET_GAME_STATE_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_GAME_STATE_FULFILLED,
    };
    expect(reducer({}, fulfilledAction)).toEqual(initialState);
  });

  it('should handle GET_NEW_GAME_FULFILLED', () => {
    const fulfilledAction = {
      type: types.GET_NEW_GAME_FULFILLED,
    };
    expect(reducer({}, fulfilledAction)).toEqual(initialState);
  });

  it('should handle MOVE_FULFILLED on not gameover', () => {
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: { gameover: false },
    };
    expect(reducer({}, fulfilledAction)).toEqual(initialState);
  });

  it('should handle MOVE_FULFILLED on gameover', () => {
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: { gameover: true },
    };
    expect(reducer({}, fulfilledAction)).toEqual(messages.GameOver);
  });
});

describe('message reducer rejected actions', () => {
  it('should handle GET_ARCADE_STATE_REJECTED', () => {
    const rejectedAction = {
      type: types.GET_ARCADE_STATE_REJECTED,
      payload: payloadError,
    };
    const expectedOutput = merge({}, messages.GetArcadeStateRejected);
    expectedOutput.value = [messages.GetArcadeStateRejected.value, payloadError.message].join(' ');
    expect(reducer({}, rejectedAction)).toEqual(expectedOutput);
  });

  it('should handle UPLOAD_REJECTED', () => {
    const rejectedAction = {
      type: types.UPLOAD_REJECTED,
      payload: payloadError,
    };
    const expectedOutput = merge({}, messages.UploadRejected);
    expectedOutput.value = [messages.UploadRejected.value, payloadError.message].join(' ');
    expect(reducer({}, rejectedAction)).toEqual(expectedOutput);
  });

  it('should handle GET_GAME_STATE_REJECTED', () => {
    const rejectedAction = {
      type: types.GET_GAME_STATE_REJECTED,
      payload: payloadError,
    };
    const expectedOutput = merge({}, messages.GetGameStateRejected);
    expectedOutput.value = [messages.GetGameStateRejected.value, payloadError.message].join(' ');
    expect(reducer({}, rejectedAction)).toEqual(expectedOutput);
  });

  it('should handle GET_NEW_GAME_REJECTED', () => {
    const rejectedAction = {
      type: types.GET_NEW_GAME_REJECTED,
      payload: payloadError,
    };
    const expectedOutput = merge({}, messages.GetNewGameRejected);
    expectedOutput.value = [messages.GetNewGameRejected.value, payloadError.message].join(' ');
    expect(reducer({}, rejectedAction)).toEqual(expectedOutput);
  });

  it('should handle MOVE_REJECTED', () => {
    const rejectedAction = {
      type: types.MOVE_REJECTED,
      payload: payloadError,
    };
    const expectedOutput = merge({}, messages.MoveRejected);
    expectedOutput.value = [messages.MoveRejected.value, payloadError.message].join(' ');
    expect(reducer({}, rejectedAction)).toEqual(expectedOutput);
  });

  it('should handle HIDE_MESSAGE', () => {
    const action = {
      type: types.HIDE_MESSAGE,
    };
    const expectedOutput = merge({}, initialState, { visible: false });
    expect(reducer({}, action)).toEqual(expectedOutput);
  });
});
