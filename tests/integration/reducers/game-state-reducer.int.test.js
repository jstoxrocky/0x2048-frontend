import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import merge from 'lodash/merge';
import reducer from '../../../src/reducers/game-state-reducer';
import * as types from '../../../src/actions/action-types';
import * as api from '../../../src/package/api';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as test from '../../unit/package/test-setup/test-provider';

web3Provisioned.web3 = new Web3();
const provider = ganache.provider(test.options);
web3Provisioned.web3.setProvider(provider);

describe('/iou and /move', () => {
  beforeAll(async () => {
    // IOU
    const value = 100;
    const msg = Web3.utils.soliditySha3(
      { type: 'address', value: deployedContract.accountAddress },
      { type: 'address', value: test.user.address },
      { type: 'uint256', value },
    );
    const signature = web3Provisioned.web3.eth.accounts.sign(msg, test.user.privateKey);
    const { v } = signature;
    const signed = merge(
      {},
      { signature: merge({}, signature, { v: Web3.utils.hexToNumber(v) }) },
      { user: test.user.address, value },
    );
    const data = await api.iou(signed);
    const { success } = data;
    expect(success).toBe(true);
  });

  it('should handle MOVE_FULFILLED', async () => {
    const direction = 1;
    const data = await api.move(test.user.address, direction);
    const fulfilledAction = {
      type: types.MOVE_FULFILLED,
      payload: data,
    };
    const state = reducer({}, fulfilledAction);
    expect(state).toHaveProperty('score');
    expect(state).toHaveProperty('board');
    expect(state).toHaveProperty('gameover');
    expect(state).toHaveProperty('signature');

    const {
      score, board, gameover, signature,
    } = state;

    expect(typeof score).toBe('number');
    expect(typeof gameover).toBe('boolean');

    expect(score).toBe(0);
    expect(board.length).toBe(4);
    expect(board[0].length).toBe(4);
    expect(gameover).toBe(false);

    expect(signature).toHaveProperty('message');
    expect(signature).toHaveProperty('messageHash');
    expect(signature).toHaveProperty('v');
    expect(signature).toHaveProperty('r');
    expect(signature).toHaveProperty('s');
    expect(signature).toHaveProperty('signature');
    const {
      message, messageHash, v, r, s,
    } = signature;
    const subSignature = signature.signature;

    expect(typeof message).toBe('string');
    expect(typeof messageHash).toBe('string');
    expect(typeof v).toBe('number');
    expect(typeof r).toBe('string');
    expect(typeof s).toBe('string');
    expect(typeof subSignature).toBe('string');
  });
});
