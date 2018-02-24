import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import merge from 'lodash/merge';
import * as api from '../../../src/package/base-api';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as test from '../../unit/package/test-setup/test-provider';
import * as web3Provisioned from '../../../src/package/web3-provisioned';

web3Provisioned.web3 = new Web3();
const provider = ganache.provider(test.options);
web3Provisioned.web3.setProvider(provider);

it('/gamestate', async () => {
  const data = await api.gameState();
  expect(data).toHaveProperty('score');
  expect(data).toHaveProperty('board');
  expect(data).toHaveProperty('gameover');
  expect(data).toHaveProperty('signature');
  const {
    score, board, gameover, signature,
  } = data;

  expect(typeof score).toBe('number');
  expect(typeof gameover).toBe('boolean');

  expect(score).toBe(0);
  expect(board.length).toBe(4);
  expect(board[0].length).toBe(4);
  expect(gameover).toBe(true);

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

  it('/move', async () => {
    // Move
    const direction = 1;
    const data = await api.move(test.user.address, direction);

    expect(data).toHaveProperty('score');
    expect(data).toHaveProperty('board');
    expect(data).toHaveProperty('gameover');
    expect(data).toHaveProperty('signature');
    const {
      score, board, gameover, signature,
    } = data;

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
