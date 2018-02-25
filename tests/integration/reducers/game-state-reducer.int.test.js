import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';
import * as api from '../../../src/package/api';
import * as accounts from '../../accounts';
import sendIOU from '../sendIOU';

describe('live data from webserver', () => {
  beforeAll(async () => {
    await sendIOU();
  });

  it('should update state', async () => {
    const direction = 1;
    const data = await api.move(accounts.user.address, direction);
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: data,
    };
    const state = reducer({}, fulfilledAction);
    expect(state).toEqual(data);
  });
});
